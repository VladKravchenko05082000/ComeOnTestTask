import { http, HttpResponse } from "msw";

import mockData from "../../mock/mock-data.json";

export const API = (
  import.meta.env.VITE_API_URL ?? "http://localhost:3001"
).replace(/\/$/, "");

type MockPlayer = {
  name: string;
  avatar: string;
  event: string;
  password: string;
};

export const players: Record<string, MockPlayer> = {
  rebecka: {
    name: "Rebecka Awesome",
    avatar: "images/avatar/rebecka.jpg",
    event: "Last seen gambling on Starburst.",
    password: "secret",
  },
};

type Credentials = { username: string; password: string };

export const handlers = [
  http.post(`${API}/login`, async ({ request }) => {
    const { username, password } = (await request.json()) as Credentials;
    const player = players[username];

    if (player && player.password === password) {
      return HttpResponse.json({
        status: "success",
        player: {
          name: player.name,
          avatar: player.avatar,
          event: player.event,
        },
      });
    }

    return HttpResponse.json(
      { status: "fail", error: "player does not exist or wrong password" },
      { status: 400 },
    );
  }),

  http.post(`${API}/logout`, async ({ request }) => {
    const { username } = (await request.json()) as { username: string };

    if (players[username]) {
      return HttpResponse.json({ status: "success" });
    }

    return HttpResponse.json(
      { status: "fail", error: "Username do not match!" },
      { status: 400 },
    );
  }),

  http.get(`${API}/games`, () => HttpResponse.json(mockData.games)),
  http.get(`${API}/categories`, () => HttpResponse.json(mockData.categories)),
];
