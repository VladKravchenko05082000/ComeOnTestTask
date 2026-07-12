import type { FC } from "react";
import { IconWrapper } from "../IconWrapper";
import type { SvgIconsProps } from "./types";

export const EyeIcon: FC<SvgIconsProps> = ({ className, ...props }) => {
  return (
    <IconWrapper
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </IconWrapper>
  );
};
