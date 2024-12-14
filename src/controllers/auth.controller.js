"use strict"

const { User } = require("../models/user.model")
const passwordEncrypt = require("../helpers/passwordEncrypt")

module.exports = {

    login: async (req, res) => {
        const { email, password } = req.body
        if (email && password) {
            //email ve parola var mı?
            const user = await User.findOne({ email })
            if (user) {
                // kullanıcı doğru
                if (user.password == passwordEncrypt(password)) {
                    // parola doğru

                    /*  SESSION */
                    // req.session = {
                    //     email: user.email,
                    // password: user.password
                    // }
                    // req.session.email = user.email 
                    req.session._id = user._id
                    req.session.password = user.password
                    /*  SESSION */

                    /* COOKIE */
                    // Beni Hatırla
                    if (req.body?.remindMe) {
                        req.session.remindMe = true,
                            req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3 // 3 gün hatırla
                    }
                    /* COOKIE */


                    res.status(200).send({
                        error: false,
                        message: "Giriş başarılı"
                    })
                } else {
                    res.errorStatusCode = 401
                    throw new Error('Hatalı parola.')
                }
            } else {
                res.errorStatusCode = 401
                throw new Error('Kullanıcı bulunamadı.')
            }
        } else {
            res.errorStatusCode = 401
            throw new Error('Email and parola gerekli.')
        }


    },

    logout: async (req, res) => {
        req.session = null // session cookie verilerini silmek için null eşitlemek yeterli
        res.status(200).send({
            error: false,
            message: "Çıkış başarılı"
        })
    },
}