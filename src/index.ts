import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { mockApis } from "./mock-data";

const baseRes = {
  code: "SUCCESS",
  msg: "This is the mock data response.",
};

const app = new Elysia().use(cors({ origin: process.env.CROS_ORIGIN }));

mockApis.forEach((api) => {
  (app as any)[api.method](api.path, async () => {
    return { ...baseRes, data: api.data };
  });
});

app.listen(2025);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
