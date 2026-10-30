import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ScalesProps {
  orientation?: "horizontal" | "vertical" | "diagonal";
  size?: number;
  className?: string;
  color?: string;
}

function gradientAngle(orientation: ScalesProps["orientation"]) {
  if (orientation === "horizontal") return "0deg";
  if (orientation === "vertical") return "90deg";
  return "315deg";
}

export function Scales({ orientation = "diagonal", size = 10, className, color = "rgba(24,24,27,0.08)" }: ScalesProps) {
  const angle = gradientAngle(orientation);

  return (
    <div className={cn("absolute inset-0 h-full w-full overflow-hidden", className)}>
      <div
        className="h-full w-full"
        style={
          {
            backgroundImage: `repeating-linear-gradient(${angle}, ${color} 0, ${color} 1px, transparent 0, transparent 50%)`,
            backgroundSize: `${size}px ${size}px`,
          } as CSSProperties
        }
      />
    </div>
  );
}

export function ScalesContainer({
  children,
  orientation = "diagonal",
  size = 10,
  className,
  containerClassName,
  color,
}: ScalesProps & { children?: ReactNode; containerClassName?: string }) {
  return (
    <div className={cn("relative", containerClassName)}>
      <Scales orientation={orientation} size={size} className={className} color={color} />
      {children}
    </div>
  );
}

export default Scales;
