import type { FC } from "react";
import { IconWrapper } from "../IconWrapper";
import type { SvgIconsProps } from "./types";

export const ErrorCircleIcon: FC<SvgIconsProps> = ({ className }) => {
  return (
    <IconWrapper viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9zm1-4a1 1 0 100 2 1 1 0 000-2z"
        clipRule="evenodd"
      />
    </IconWrapper>
  );
};
