import { cn } from "@/lib/utils";

interface UserInfoProps {
  name: string;
  avatar: string;
  event?: string;
  className?: string;
}

export const UserInfo = ({ name, avatar, event, className }: UserInfoProps) => {
  return (
    <div
      data-slot="user-info"
      className={cn("flex items-center gap-3", className)}
    >
      <img
        src={avatar}
        alt={name}
        className="size-8 shrink-0 rounded-full object-cover"
      />

      <div>
        <p className="font-bold">{name}</p>
        {event && <p className="text-sm text-muted-foreground">{event}</p>}
      </div>
    </div>
  );
};
