import { request } from "@playwright/test";
import { getApEnvVar } from "../../ap/utils/utils";

export async function setupApiContext(
  baseUrl: string = `${getApEnvVar().adminPortalApiUrl}`,
  token: string = `${getApEnvVar().apBearerToken}`
) {
  let apiContext = await request.newContext({
    baseURL: baseUrl,
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return apiContext;
}
