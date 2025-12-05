// Generic 404 handler
export const notFound = (req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
};

// Centralized error handler
export const errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal server error',
    details: err.details || undefined,
  });
};
