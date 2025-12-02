export type HTTPMethod = "delete" | "get" | "patch" | "post" | "put";

export interface APIItem {
  method: HTTPMethod;
  path: string;
  data: any;
}
