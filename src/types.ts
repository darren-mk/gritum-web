import { paths } from "./api-spec-gen";

export type ApiKey =
  paths["/api/dashboard/api-keys"]["get"]["responses"][200]["content"]["application/json"][number];
