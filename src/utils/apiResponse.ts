export const createResponse = <T>(data: T, message = 'Request completed successfully') => ({
  success: true,
  data,
  message
});
