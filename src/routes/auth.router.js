"use strict";

const router = require("express").Router();
const {login, logout} = require("../controllers/auth.controller")


// URL: /auth/login
router.route("/login").post(login)

// URL: /auth/logout
router.route("/logout").all(logout) 
// router.route("/logout").get(logout) //swagger all'u desteklemez

module.exports = router

