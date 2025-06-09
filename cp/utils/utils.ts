export const getCpEnvVar = (): {
  cpEmailAddress: string;
  cpPassword: string;
  clientPortalApiUrl: string;
} => {
  return {
    cpEmailAddress: process.env.CP_EMAIL_ADDRESS as string,
    cpPassword: process.env.CP_PASSWORD as string,
    clientPortalApiUrl: process.env.CP_API_URL as string,
  };
};

export function generateFBANumber() {
  return "FBA" + Math.floor(Math.random() * 1000000000);
}
