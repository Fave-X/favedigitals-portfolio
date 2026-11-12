import type { ReactNode } from "react";

type ContainerAs = "div" | "main" | "section" | "header" | "footer" | "nav" | "aside";

type ContainerProps = {
  as?: ContainerAs;
  className?: string;
  children: ReactNode;
};

/**
 * Standard content container: max width 1152px, centered,
 * 24px horizontal padding on mobile, 40px from `md` up.
 */
export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-content px-6 md:px-10 ${className ?? ""}`}>
      {children}
    </Tag>
  );
}