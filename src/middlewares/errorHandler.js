"use strict";


module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode || 500;

  res.status(statusCode).send({
    isError: true, // özel veri
    message: err.message, // hata mesajı
    cause: err.cause, // hata sebebi
    // stack: err.stack, // hata ayrıntısı
  });
};
