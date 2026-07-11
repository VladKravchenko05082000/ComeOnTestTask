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
            className={cn("flex items-center gap-3", className)}
          >
            <Image
              src={player.avatar}
              alt={player.name}
              className="size-8 shrink-0 rounded-full object-cover"
            />

            <div>
              <p className="font-bold">{player.name}</p>
              {player.event && (
                <p className="text-sm text-muted-foreground">{player.event}</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <Skeleton className={cn("h-11 w-56", className)} />
      )}
    </>
  );
};
