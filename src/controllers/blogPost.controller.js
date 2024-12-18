"use strict";

// Modelleri çağırma:
const { BlogPost } = require("../models/blogPost.model");
const { NotFoundError } = require("../errors/customError");

module.exports.blogPost = {
    list: async (req, res) => {
        const data = await BlogPost.find()

        res.send({
            result: data,
        });
    },

    //? CRUD ->

    create: async (req, res) => {
        //login olunmuşsa userId'yi req.user'dan alma
        if(req.user) req.body.userId = req.user._id

        const result = await BlogPost.create(req.body);

        res.send({
            result,
        });
    },

    read: async (req, res) => {
        const result = await BlogPost.findOne({ _id: req.params.postId });
        if (!result) {
            throw new NotFoundError("Eşleşen veri bulunamadı");
        }
        res.send({
            isError: false,
            result,
        });
    },

    update: async (req, res) => {
        const result = await BlogPost.updateOne(
            { _id: req.params.postId },
            req.body
        );

        //!güncellenmek istenen veri yoksa
        if (result.matchedCount === 0) {
          throw new NotFoundError("Eşleşen veri bulunamadı");
        // return res.status(404).send("Eşleşen veri bulunamadı");
        }
        //! güncellenmek istenen veri var ama zaten güncel olduğu için güncelleme yapılmadı:
        if (result.matchedCount > 0 && result.modifiedCount === 0) {
          return res.status(200).send({ message: "Belge zaten güncel." });
        }
        res.status(202).send({
            isError: false,
            result,
            new: await BlogPost.findOne({ _id: req.params.postId }),
        });
    },

    delete: async (req, res) => {
        const result = await BlogPost.deleteOne({ _id: req.params.postId });
        console.log(result);
        //deletedCount
        if (result.deletedCount === 0) {
            throw new NotFoundError("Eşleşen veri bulunamadı");
            // return res.status(404).send("Eşleşen veri bulunamadı");
        }
        //! 204 ile veri gönderilmez No_Content
        res.status(204).send({
            result,
        });
    },
};


