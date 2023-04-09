const errorHandler = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Something Went Wrong'
  res.status(status).json({
    error: {
      status,
      message,
    },
  })
}

module.exports = errorHandler
