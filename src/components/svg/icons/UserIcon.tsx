import type { FC } from "react";
import { IconWrapper } from "../IconWrapper";
import type { SvgIconsProps } from "./types";

export const UserIcon: FC<SvgIconsProps> = ({ className, ...props }) => {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </IconWrapper>
  );
};
