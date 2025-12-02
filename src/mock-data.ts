import { mock1 } from "./api-data";
import type { APIItem } from "./types";

export const mockApis: APIItem[] = [
  {
    method: "get",
    path: "/user/:userId",
    data: mock1,
  },
];
