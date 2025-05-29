export const getApEnvVar = (): {
  adminPortalEmailAddress: string;
  adminPortalPassword: string;
  apBearerToken: string;
  adminPortalApiUrl: string;
} => {
  return {
    adminPortalEmailAddress: process.env.AP_EMAIL_ADDRESS as string,
    adminPortalPassword: process.env.AP_PASSWORD as string,
    apBearerToken: process.env.AP_BEARER_TOKEN as string,
    adminPortalApiUrl: process.env.AP_API_URL as string,
  };
};
