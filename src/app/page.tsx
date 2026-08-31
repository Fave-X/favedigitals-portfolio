import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { AnalyticalStack } from "@/components/sections/AnalyticalStack";
import { Web3Journey } from "@/components/sections/Web3Journey";
import { ResearchInsights } from "@/components/sections/ResearchInsights";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

/**
 * Single-page portfolio (knowledge.md §14): Navigation (layout) + Hero +
 * Selected Work + Analytical Stack + Web3 Journey + Research & Insights +
 * About + Contact, with the Footer rendered by the root layout.
 */
export default function Home() {
  return (
    <main id="content">
      <Hero />
      <SelectedWork />
      <AnalyticalStack />
      <Web3Journey />
      <ResearchInsights />
      <About />
      <Contact />
    </main>
  );
}