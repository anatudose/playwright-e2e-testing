export const getApEnvVar = (): {
  adminPortalEmailAddress: string;
  adminPortalPassword: string;
} => {
  return {
    adminPortalEmailAddress: process.env.AP_EMAIL_ADDRESS as string,
    adminPortalPassword: process.env.AP_PASSWORD as string,
  };
};
