export const success = (results, response, message) => {
  const { statusCode } = response;
  return {
    message,
    error: false,
    code: statusCode,
    results,
  };
};

export const error = (response, message) => {
  // List of common HTTP request code
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];
  const { statusCode } = response;

  // Get matched code
  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;

  return {
    message,
    code: statusCode,
    error: true,
  };
};
