import { useNavigate } from "react-router";

import { useLogoutMutation } from "@/api/auth/authApi";
import { selectPlayer } from "@/store/authSlice/slice";
import { useAppSelector } from "@/hooks";

export const useLogout = () => {
  const navigate = useNavigate();
  const player = useAppSelector(selectPlayer);
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    if (player) {
      // The auth slice clears the player/cookies on both fulfilled and
      // rejected, so awaiting is enough regardless of the request outcome.
      await logout({ username: player.username });
    }

    navigate("/", { replace: true });
  };

  return { handleLogout, isLoading };
};
