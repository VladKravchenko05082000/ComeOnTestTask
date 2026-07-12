import { cn, type PlayerInterface } from "@/lib";

import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { Image } from "@/components/ui/image/Image";

interface UserInfoProps {
  player: PlayerInterface | null;
  className?: string;
}

export const UserInfo = ({ player, className }: UserInfoProps) => {
  return (
    <>
      {player ? (
        <>
          <div
            data-slot="user-info"
            className={cn("flex items-center gap-4", className)}
          >
            <Image
              src={player.avatar}
              alt={player.name}
              className="size-15 shrink-0 rounded-full object-cover ring-3 ring-brand/20"
            />

            <div className="min-w-0">
              <p className="text-lg font-extrabold">{player.name}</p>
              {player.event && (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {player.event}
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <Skeleton className={cn("h-15 w-56", className)} />
      )}
    </>
  );
};
