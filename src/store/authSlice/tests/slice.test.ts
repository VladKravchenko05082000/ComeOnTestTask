import { describe, expect, it } from "vitest";

import { readPlayerFromCookie } from "../slice";

import { CONFIG_NAMES, type PlayerInterface } from "../../../lib";

const player: PlayerInterface = {
  name: "Rebecka Awesome",
  avatar: "/images/avatar/rebecka.jpg",
  event: "Last seen gambling on Starburst.",
  username: "rebecka",
};

const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}; path=/`;
};

const setPlayerCookie = (value: unknown) => {
  setCookie(CONFIG_NAMES.isAuth, "1");
  setCookie(
    CONFIG_NAMES.player,
    encodeURIComponent(
      typeof value === "string" ? value : JSON.stringify(value),
    ),
  );
};

describe("readPlayerFromCookie", () => {
  it("returns the validated player when cookies are present and valid", () => {
    setPlayerCookie(player);

    expect(readPlayerFromCookie()).toEqual(player);
  });

  it("returns null when the isAuth cookie is not set", () => {
    setCookie(CONFIG_NAMES.player, encodeURIComponent(JSON.stringify(player)));

    expect(readPlayerFromCookie()).toBeNull();
  });

  it("returns null when the player cookie is missing", () => {
    setCookie(CONFIG_NAMES.isAuth, "1");

    expect(readPlayerFromCookie()).toBeNull();
  });

  it("returns null when the player cookie is malformed JSON", () => {
    setPlayerCookie("{ not valid json");

    expect(readPlayerFromCookie()).toBeNull();
  });

  it("returns null when the player cookie fails schema validation", () => {
    setPlayerCookie({ name: "only a name" });

    expect(readPlayerFromCookie()).toBeNull();
  });
});
