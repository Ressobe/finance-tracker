import createClient from "openapi-fetch";
import type { paths } from "./v1";

const apiClient = createClient<paths>({ baseUrl: process.env.API_URL! });

export default apiClient;
