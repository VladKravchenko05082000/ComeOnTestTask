import { useState, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export interface ImageProps extends ComponentPropsWithoutRef<"img"> {
  skeletonClassName?: string;
}

export const Image = ({
  className,
  skeletonClassName,
  onLoad,
  onError,
  ...props
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <Skeleton className={cn(className, skeletonClassName)} />}

      <img
        data-slot="image"
        className={cn(className, !isLoaded && "hidden")}
        onLoad={(event) => {
          setIsLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setIsLoaded(true);
          onError?.(event);
        }}
        {...props}
      />
    </>
  );
};
