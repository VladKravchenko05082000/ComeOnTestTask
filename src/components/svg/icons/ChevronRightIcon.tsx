import type { FC } from "react";
import { IconWrapper } from "../IconWrapper";
import type { SvgIconsProps } from "./types";

export const ChevronRightIcon: FC<SvgIconsProps> = ({ className }) => {
  return (
    <IconWrapper viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </IconWrapper>
  );
};
