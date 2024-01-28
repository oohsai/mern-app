export const errorHandler = (statusCode, mesaage) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
