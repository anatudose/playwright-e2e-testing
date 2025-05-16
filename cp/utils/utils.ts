export const getCpEnvVar = (): {
  cpEmailAddress: string;
  cpPassword: string;
  apBearerToken: string;
} => {
  return {
    cpEmailAddress: process.env.CP_EMAIL_ADDRESS as string,
    cpPassword: process.env.CP_PASSWORD as string,
    apBearerToken: process.env.AP_BEARER_TOKEN as string,
  };
};

export function generateFBANumber() {
  return "FBA" + Math.floor(Math.random() * 1000000000);
}
