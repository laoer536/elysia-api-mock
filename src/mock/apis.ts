import { mock1 } from "./data.ts";
import type { APIItem } from "../types.ts";

export const apis: APIItem[] = [
  {
    method: "get",
    path: "/user/:userId",
    data: mock1,
  },
];
