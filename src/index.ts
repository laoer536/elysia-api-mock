import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { apis } from "./mock/apis.ts";

const BASE_RES = {
  code: "SUCCESS",
  msg: "This is the mock data response.",
};

const app = new Elysia().use(cors({ origin: process.env.CORS_ORIGIN }));

apis.forEach((api) => {
  (app as any)[api.method](api.path, async () => {
    return { ...BASE_RES, data: api.data };
  });
});

app.listen(2025);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
