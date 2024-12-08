"use strict";

const mongoose = require("mongoose");
const passwordEncrypt = require("../helpers/passwordEncrypt")

//User Schema:
const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            unique: true,
            required: [true, "Email zorunlu"], // required: true da olur
        },

        password: {
            type: String,
            trim: true,
            required: [true, "Şifre zorunlu"], // required: true da olur
            set: (password) => passwordEncrypt(password)
        },
        firstName: String,
        lastName: String
    }, {
    collection: "users", // collection ismi
    timestamps: true
})

module.exports = {
    User: mongoose.model("User", UserSchema)
}
