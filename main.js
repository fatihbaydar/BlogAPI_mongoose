"use strict";

const express = require("express");
const app = express();

require("express-async-errors"); //! Asenkron hata yakalama

require("dotenv").config();
const PORT = process.env.PORT || 8000;

//! Body'den gelen veriyi javascript nesnesi olarak ayrıştırmak için
app.use(express.json());

//! Veritabanına normal fonksiyon ile bağlanma
require("./src/config/dbConnection")() // bu bir fonksiyon olduğu için çağrılmalı

//! Veritabanına sınıf ile bağlanma
// require("./src/config/dbConnection") // sınıfın kendisi fonskiyonu çağırdığı için burada tekrar çağırmaya gerek yok

app.use("/blog/category", require("./src/routes/blogCategory.router"));
app.use("/blog/post", require("./src/routes/blogPost.router"));
app.use("/user", require("./src/routes/user.router"))
app.all("/", (req, res) => {
  res.send("BLOG API");
});

app.use("*", (req, res) => {
  res.status(404).send({ isError: true, message: "Yol bulunamadı" });
});

//! Hata yakalama:
app.use(require("./src/middlewares/errorHandler"));

/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
