"use strict";


const mongoose = require("mongoose");
const { CustomError } = require("../errors/customError");

//'mongodb://localhost:27017/blogAPI'

/*------------------------------------------------------*/
const dbConnection = () => {
  if (!process.env.MONGODB_URI) { // url yoksa
    throw new CustomError("mongodb_url gerekli"); 
  }
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("veritabanına bağlandı");
  } catch (error) {
    console.log("veritabanı bağlantı hatası");
  }
};

/*------------------------------------------------------
//! # private, _ ile başlayan dışarıdan erişilmemeli
class DatabaseConnection {
    constructor() {
      this.#_connect();
    }
  
    #_connect() {
      if (!process.env?.MONGODB)
        throw new CustomError("mongodb_url gerekli", 500);
      mongoose
        .connect(process.env?.MONGODB)
        .then(() => {
          console.log("veritabanına bağlandı");
        })
        .catch((err) => {
          console.error("veritabanı bağlantı hatası");
        });
    }
  }

  module.exports=new DatabaseConnection()
/*------------------------------------------------------*/


module.exports = dbConnection;
