export const getApiUrl = (path: string) => {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  return `${baseUrl}${path}`;
};
