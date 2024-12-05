"use strict";


const { StatusCodes } = require("http-status-codes");
class CustomError extends Error {
  name = "CustomError";
  statusCode;
  constructor(
    message = "Hata oluştu",
    status = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this.status = status;
  }
}

class NotFoundError extends Error {
  name = "NotFoundError";
  statusCode = StatusCodes.NOT_FOUND;
  constructor(message = "Bulunamadı") {
    super(message);
  }
}

class BadRequestError extends Error {
  name = "BadRequestError";
  statusCode = StatusCodes.BAD_REQUEST;
  constructor(message = "Geçersiz bilgi") {
    super(message);
  }
}

module.exports = { BadRequestError, NotFoundError, CustomError };
