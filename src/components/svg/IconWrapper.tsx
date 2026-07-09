import type { ReactNode, SVGProps, FC } from "react";

interface IconWrapperProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  children: ReactNode;
}

export const IconWrapper: FC<IconWrapperProps> = ({
  size = 24,
  className,
  children,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={["shrink-0", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </svg>
  );
};
