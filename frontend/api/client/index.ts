import createClient, { Middleware } from "openapi-fetch";
import type { paths } from "./v1";
import { cookies, type UnsafeUnwrappedCookies } from "next/headers";

export const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const token = (cookies() as unknown as UnsafeUnwrappedCookies).get("token");

    if (token) {
      request.headers.set("Authorization", `Bearer ${token.value}`);
    }

    return request;
  },
};

const apiClient = createClient<paths>({ baseUrl: process.env.API_URL! });

apiClient.use(authMiddleware);

export default apiClient;
