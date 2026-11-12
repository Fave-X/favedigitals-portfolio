"use client";

import { useEffect, useRef, useState } from "react";
import type { ChainSupply } from "@/lib/stablecoin-chains";
import { formatBillions } from "@/lib/stablecoin-chains";

type Props = {
  chains: ChainSupply[];
  /** Index of the highlighted chain, or null. */
  active: number | null;
  onActive: (index: number | null) => void;
};

/** One dot = $1B. Clusters are balls whose volume grows with supply. */
const DOT_BILLIONS = 1;
const RING_RADIUS = 3.05;

function cssVar(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

/**
 * Interactive 3D view of stablecoin supply by chain. Each cluster is a chain,
 * each dot is $1B. Drag to rotate, hover or tap a cluster to read it.
 *
 * three.js is imported inside the effect so it never blocks first paint.
 * Rendering pauses while the canvas is off screen, auto-rotation stops for
 * reduced-motion users, and the legend beside it carries the same numbers
 * for keyboard and screen-reader users.
 */
export function SupplyConstellation({ chains, active, onActive }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<number | null>(active);
  const onActiveRef = useRef(onActive);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    activeRef.current = active;
    onActiveRef.current = onActive;
  }, [active, onActive]);

  useEffect(() => {
    const mount = mountRef.current;
    const labelLayer = labelsRef.current;
    if (!mount || !labelLayer) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      } catch {
        setFailed(true);
        return;
      }

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);
      renderer.domElement.style.touchAction = "pan-y";
      renderer.domElement.setAttribute("aria-hidden", "true");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 3.9, 9.4);
      camera.lookAt(0, -0.2, 0);

      const root = new THREE.Group();
      root.rotation.x = 0.12;
      scene.add(root);

      // Round dot sprite.
      const sprite = document.createElement("canvas");
      sprite.width = sprite.height = 64;
      const ctx = sprite.getContext("2d")!;
      ctx.beginPath();
      ctx.arc(32, 32, 28, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      const dotTexture = new THREE.CanvasTexture(sprite);

      // Orbit ring.
      const ringPoints: import("three").Vector3[] = [];
      for (let i = 0; i <= 160; i++) {
        const a = (i / 160) * Math.PI * 2;
        ringPoints.push(new THREE.Vector3(Math.cos(a) * RING_RADIUS, 0, Math.sin(a) * RING_RADIUS));
      }
      const ringMaterial = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.55 });
      const ring = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(ringPoints), ringMaterial);
      root.add(ring);

      // Clusters.
      const golden = Math.PI * (3 - Math.sqrt(5));
      const clusters = chains.map((chain, index) => {
        const count = Math.max(1, Math.round(chain.billions / DOT_BILLIONS));
        const radius = 0.19 * Math.cbrt(count);
        const positions = new Float32Array(count * 3);
        for (let k = 0; k < count; k++) {
          const r = count === 1 ? 0 : radius * Math.cbrt((k + 0.5) / count);
          const y = 1 - ((k + 0.5) / count) * 2;
          const ring2 = Math.sqrt(1 - y * y);
          const theta = golden * k;
          positions[k * 3] = Math.cos(theta) * ring2 * r;
          positions[k * 3 + 1] = y * r;
          positions[k * 3 + 2] = Math.sin(theta) * ring2 * r;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
          size: 0.15,
          map: dotTexture,
          transparent: true,
          alphaTest: 0.4,
          depthWrite: false,
          sizeAttenuation: true,
        });
        const points = new THREE.Points(geometry, material);
        const angle = (index / chains.length) * Math.PI * 2 - Math.PI / 2;
        points.position.set(Math.cos(angle) * RING_RADIUS, 0, Math.sin(angle) * RING_RADIUS);
        root.add(points);

        const label = document.createElement("div");
        label.className = "constellation-label";
        label.innerHTML = `<span>${chain.name}</span><b>${formatBillions(chain.billions)}</b>`;
        labelLayer.appendChild(label);

        return { points, material, geometry, radius, label };
      });

      // Theme colours, refreshed when the theme toggles.
      const applyTheme = () => {
        const ink = new THREE.Color(cssVar("--color-ink", "#0d0d0f"));
        const muted = new THREE.Color(cssVar("--color-muted", "#6b6b71"));
        const accent = new THREE.Color(cssVar("--color-accent", "#c64a0b"));
        ringMaterial.color = new THREE.Color(cssVar("--color-line-strong", "#c9ccc3"));
        clusters.forEach((cluster, index) => {
          const isActive = activeRef.current === index;
          const dim = activeRef.current !== null && !isActive;
          // Largest chain in orange, second in ink, the rest muted; the selected chain turns orange.
          cluster.material.color =
            isActive || (activeRef.current === null && index === 0) ? accent : index === 1 ? ink : muted;
          cluster.material.opacity = dim ? 0.35 : 1;
          cluster.label.dataset.active = isActive ? "true" : "false";
          cluster.label.dataset.dim = dim ? "true" : "false";
        });
      };
      applyTheme();
      const themeObserver = new MutationObserver(applyTheme);
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });

      // Sizing.
      let width = 1;
      let height = 1;
      const resize = () => {
        width = mount.clientWidth || 1;
        height = mount.clientHeight || 1;
        renderer.setSize(width, height, false);
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        camera.aspect = width / height;
        // Pull back on narrow screens so the ring always fits.
        camera.position.z = width < 480 ? 9.3 : 9.4;
        camera.position.y = width < 480 ? 3.2 : 3.9;
        camera.lookAt(0, -0.2, 0);
        camera.updateProjectionMatrix();
      };
      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);

      // Interaction: drag to rotate, hover or tap to pick.
      let dragging = false;
      let lastX = 0;
      let downX = 0;
      let velocity = 0;
      const screenPos = new THREE.Vector3();
      const worldPos = new THREE.Vector3();

      const pick = (clientX: number, clientY: number): number | null => {
        const rect = renderer.domElement.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        let best: number | null = null;
        let bestDist = Infinity;
        clusters.forEach((cluster, index) => {
          cluster.points.getWorldPosition(worldPos);
          screenPos.copy(worldPos).project(camera);
          const sx = (screenPos.x * 0.5 + 0.5) * width;
          const sy = (-screenPos.y * 0.5 + 0.5) * height;
          const dist = Math.hypot(sx - x, sy - y);
          const hitRadius = Math.max(22, (cluster.radius / worldPos.distanceTo(camera.position)) * height * 1.9);
          if (dist < hitRadius && dist < bestDist) {
            best = index;
            bestDist = dist;
          }
        });
        return best;
      };

      const canvas = renderer.domElement;
      const onDown = (event: PointerEvent) => {
        dragging = true;
        lastX = downX = event.clientX;
        canvas.setPointerCapture(event.pointerId);
      };
      const onMove = (event: PointerEvent) => {
        if (dragging) {
          const dx = event.clientX - lastX;
          lastX = event.clientX;
          root.rotation.y += dx * 0.008;
          velocity = dx * 0.008;
          return;
        }
        if (event.pointerType === "mouse") {
          const hit = pick(event.clientX, event.clientY);
          canvas.style.cursor = hit === null ? "grab" : "pointer";
          if (hit !== activeRef.current) onActiveRef.current(hit);
        }
      };
      const onUp = (event: PointerEvent) => {
        dragging = false;
        if (Math.abs(event.clientX - downX) < 6) {
          onActiveRef.current(pick(event.clientX, event.clientY));
        }
      };
      const onLeave = () => {
        if (!dragging) onActiveRef.current(null);
      };
      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerup", onUp);
      canvas.addEventListener("pointerleave", onLeave);
      canvas.style.cursor = "grab";

      // Render loop, paused off screen.
      let visible = true;
      const visibilityObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) loop();
      });
      visibilityObserver.observe(mount);

      let frame = 0;
      let lastTime = performance.now();
      let lastActive: number | null | undefined;
      const loop = () => {
        cancelAnimationFrame(frame);
        if (!visible || disposed) return;
        frame = requestAnimationFrame(loop);
        const now = performance.now();
        const dt = Math.min(0.05, (now - lastTime) / 1000);
        lastTime = now;

        if (!dragging) {
          velocity *= 0.92;
          root.rotation.y += velocity;
          if (!reduceMotion && activeRef.current === null) root.rotation.y += dt * 0.12;
        }
        if (lastActive !== activeRef.current) {
          lastActive = activeRef.current;
          applyTheme();
        }
        const narrow = width < 480;
        clusters.forEach((cluster, index) => {
          // On phones, label only the four largest chains (plus the selected one); the legend lists all.
          cluster.label.style.display = narrow && index > 3 && activeRef.current !== index ? "none" : "";
          cluster.points.rotation.y += reduceMotion ? 0 : dt * 0.25;
          cluster.points.getWorldPosition(worldPos);
          screenPos.copy(worldPos).project(camera);
          const sx = (screenPos.x * 0.5 + 0.5) * width;
          const sy = (-screenPos.y * 0.5 + 0.5) * height;
          const offset = (cluster.radius / worldPos.distanceTo(camera.position)) * height * 1.75 + 10;
          const lx = Math.min(width - 70, Math.max(70, sx));
          cluster.label.style.transform = `translate(${lx.toFixed(1)}px, ${(sy + offset).toFixed(1)}px) translateX(-50%)`;
          cluster.label.style.zIndex = String(Math.round((1 - screenPos.z) * 1000));
        });
        renderer.render(scene, camera);
      };
      loop();

      cleanup = () => {
        cancelAnimationFrame(frame);
        visibilityObserver.disconnect();
        resizeObserver.disconnect();
        themeObserver.disconnect();
        canvas.removeEventListener("pointerdown", onDown);
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerup", onUp);
        canvas.removeEventListener("pointerleave", onLeave);
        clusters.forEach((cluster) => {
          cluster.geometry.dispose();
          cluster.material.dispose();
          cluster.label.remove();
        });
        ring.geometry.dispose();
        ringMaterial.dispose();
        dotTexture.dispose();
        renderer.dispose();
        canvas.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [chains]);

  if (failed) return null;

  return (
    <div className="absolute inset-0">
      <div ref={mountRef} className="absolute inset-0" />
      <div ref={labelsRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" />
    </div>
  );
}
