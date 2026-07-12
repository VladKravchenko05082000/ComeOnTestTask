import { useNavigate } from "react-router";

import { appApi } from "@/api";
import { useLogoutMutation } from "@/api/auth/authApi";
import { selectPlayer } from "@/store/authSlice/slice";
import { useAppDispatch, useAppSelector } from "@/hooks";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const player = useAppSelector(selectPlayer);
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    if (player) {
      await logout({ username: player.username });
    }

    dispatch(appApi.util.resetApiState());
    navigate("/", { replace: true });
  };

  return { handleLogout, isLoading };
};
