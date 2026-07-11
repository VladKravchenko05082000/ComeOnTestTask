import { z } from "zod";

import { loginRequestSchema } from "../../../lib/schema/authSchema";
import { toLoginErrorMessage } from "@/api/auth";
import type { useLoginMutation } from "@/api/auth/authApi";
import type { LoginState } from "../types";

type LoginFn = ReturnType<typeof useLoginMutation>[0];

const readValues = (formData: FormData): LoginState["values"] => ({
  username: String(formData.get("username") ?? ""),
  password: String(formData.get("password") ?? ""),
});

export const createLoginAction =
  (login: LoginFn) =>
  async (_prev: LoginState, formData: FormData): Promise<LoginState> => {
    const values = readValues(formData);

    const parsed = loginRequestSchema.safeParse(values);
    if (!parsed.success) {
      const tree = z.treeifyError(parsed.error).properties;
      return {
        success: false,
        values,
        fieldErrors: {
          username: tree?.username?.errors[0],
          password: tree?.password?.errors[0],
        },
      };
    }

    try {
      await login(parsed.data).unwrap();
      return { success: true, values };
    } catch (error) {
      return { success: false, values, formError: toLoginErrorMessage(error) };
    }
  };
