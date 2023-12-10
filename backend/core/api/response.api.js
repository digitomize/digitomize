export const success = (results, response, statusCode, message) => {
  return response.status(statusCode).json({
    message,
    success: true,
    code: statusCode,
    results,
  })
}

export const error = (response, statusCode, message) => {
  // List of common HTTP request code
  const codes = [200, 201, 400, 401, 404, 403, 422, 500]

  // Get matched code
  const findCode = codes.find((code) => code == statusCode)

  if (!findCode) statusCode = 500
  else statusCode = findCode

  return response.status(statusCode).json({
    message,
    code: statusCode,
    success: false,
  })
}
