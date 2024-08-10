const errorHandler = (error, req, res, next) => {
  res.status(500).send({
    errors: [
      {
        message: error.message,
        data: error.data,
      },
    ],
  });
};

module.exports = { errorHandler };
