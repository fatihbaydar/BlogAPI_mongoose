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

/* ------------------------------------------------------- */
//? SESSION && COOKIES

const session = require("cookie-session");
app.use(session({
  secret: process.env.SECRET_KEY, // cookie verisini şifreleme anahtarı
  maxAge: 1000 * 60 * 60 * 24 * 3, // 3 gün demek
}))

/* ------------------------------------------------------- */
//? Sessiondaki verilerin kontrolü

// user.controller'e taşındı.
app.use(require("./src/middlewares/userControl"))
/* ------------------------------------------------------- */
//Middleware: Filter Search Sort Pagination

app.use(require("./src/middlewares/findSearchSortPage"))

/* ------------------------------------------------------- */

app.use("/blog/category", require("./src/routes/blogCategory.router"));
app.use("/blog/post", require("./src/routes/blogPost.router"));
app.use("/user", require("./src/routes/user.router"))
app.use("/auth", require("./src/routes/auth.router")) // login ve logout
app.all("/", (req, res) => {
  // res.send("BLOG API");
  res.send({
    message: "BLOG API",
    user: req.user,
    session: req.session
  })
});

app.use("*", (req, res) => {
  res.status(404).send({ isError: true, message: "Yol bulunamadı" });
});

//! Hata yakalama:
app.use(require("./src/middlewares/errorHandler"));

/* ------------------------------------------------------- */

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Test verisi içindir. Bir kez çalıştırılır.
// require("./sync")()
