import type { FC } from "react";
import { IconWrapper } from "../IconWrapper";
import type { SvgIconsProps } from "./types";

const RADIUS = 10;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
/** Portion of the ring left open, so the circle is ~95% complete. */
const GAP = 0.05;

export const SpinnerIcon: FC<SvgIconsProps> = ({ className, ...props }) => {
  return (
    <IconWrapper
      role="status"
      aria-label="Loading"
      viewBox="0 0 24 24"
      fill="none"
      className={["animate-spin text-page", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r={RADIUS}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={`${CIRCUMFERENCE * (1 - GAP)} ${CIRCUMFERENCE * GAP}`}
      />
    </IconWrapper>
  );
};
