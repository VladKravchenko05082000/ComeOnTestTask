import type { FC } from "react";
import { IconWrapper } from "../IconWrapper";
import type { SvgIconsProps } from "./types";

export const LockIcon: FC<SvgIconsProps> = ({ className, ...props }) => {
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
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </IconWrapper>
  );
};
