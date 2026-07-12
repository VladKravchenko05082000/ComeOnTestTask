import { describe, expect, it, vi } from "vitest";

import { createLoginAction } from "../loginAction";

import type { LoginState } from "../../types";

type LoginFn = Parameters<typeof createLoginAction>[0];

const initialState: LoginState = {
  success: false,
  values: { username: "", password: "" },
};

const makeFormData = (values: Record<string, string>) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(values)) {
    formData.set(key, value);
  }
  return formData;
};

describe("createLoginAction", () => {
  it("returns Zod field errors and never calls login when fields are empty", async () => {
    const login = vi.fn() as unknown as LoginFn;
    const action = createLoginAction(login);

    const result = await action(initialState, makeFormData({}));

    expect(result.success).toBe(false);
    expect(result.fieldErrors?.username).toBe("Username is required");
    expect(result.fieldErrors?.password).toBe("Password is required");
    expect(login).not.toHaveBeenCalled();
  });

  it("calls login with parsed credentials and returns success on resolve", async () => {
    const unwrap = vi.fn().mockResolvedValue(undefined);
    const login = vi.fn(() => ({ unwrap })) as unknown as LoginFn;
    const action = createLoginAction(login);

    const result = await action(
      initialState,
      makeFormData({ username: "rebecka", password: "secret" }),
    );

    expect(login).toHaveBeenCalledWith({
      username: "rebecka",
      password: "secret",
    });
    expect(result.success).toBe(true);
    expect(result.values).toEqual({ username: "rebecka", password: "secret" });
  });

  it("maps a rejected login to formError while preserving values", async () => {
    const unwrap = vi.fn().mockRejectedValue({ status: 400, message: "nope" });
    const login = vi.fn(() => ({ unwrap })) as unknown as LoginFn;
    const action = createLoginAction(login);

    const result = await action(
      initialState,
      makeFormData({ username: "rebecka", password: "wrong" }),
    );

    expect(result.success).toBe(false);
    expect(result.formError).toBe("Invalid username or password.");
    expect(result.values).toEqual({ username: "rebecka", password: "wrong" });
  });
});
