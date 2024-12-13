"use strict"

const {User} = require("../models/user.model")
const passwordEncrypt = require("../helpers/passwordEncrypt")

module.exports = {

    login : async (req, res) => {
        const {email, password} = req.body
        if(email && password) {
            //email ve parola var mı?
            const user = await User.findOne({email})
            if(user) {
            // kullanıcı doğru
                if(user.password == passwordEncrypt(password)){
                    // parola doğru
                    res.status(200).send({
                        error:false,
                        message:"Giriş başarılı"
                    })
                }else{
                    res.errorStatusCode = 401
                    throw new Error('Hatalı parola.')
                }
            }else{
                res.errorStatusCode = 401
                throw new Error('Kullanıcı bulunamadı.')
            }
          }   else{
                res.errorStatusCode = 401
            throw new Error('Email and parola gerekli.')
            }
       

    },
        
    logout : async (req, res) => {
        res.send("logout")
    },
}