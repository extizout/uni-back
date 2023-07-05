exports.handleErrorResponse = (res, error, statusCode) => {
  console.error(error)
  res.status(statusCode).json({ error: error });
};
