export const errorHandler = (err, req, res, next) => {
  const statusCode = err.cause || 500;

  res.status(statusCode).json({
    message: err.message,
  });
};
