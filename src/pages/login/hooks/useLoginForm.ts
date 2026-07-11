import { useActionState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { createLoginAction } from "./loginAction";
import { useLoginMutation } from "@/api/auth/authApi";

import { ROUTES_CONFIG } from "@/lib";

import type { LocationState, LoginState } from "@/pages/login/types";

const initialState: LoginState = {
  success: false,
  values: { username: "", password: "" },
};

export const useLoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [login] = useLoginMutation();

  const [state, formAction] = useActionState(
    createLoginAction(login),
    initialState,
  );

  const from =
    (location.state as LocationState | null)?.from?.pathname ??
    `/${ROUTES_CONFIG.games}`;

  useEffect(() => {
    if (state.success) {
      navigate(from, { replace: true });
    }
  }, [state.success]);

  return { state, formAction };
};
