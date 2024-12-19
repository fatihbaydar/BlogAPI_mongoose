"use strict";

const { BlogCategory } = require("../models/blogCategory.model")

// BlogCategory Controller:
// /blog/category

module.exports.blogCategory = {
    list: async (req, res) => {
        // const data = await BlogCategory.find()
        /* const data = await BlogCategory.find({}) */ //yukardaki ile aynı

        const data = await res.getModelList(BlogCategory)
        
        res.send({
            result: data
        })
    },

    //? CRUD
    create: async (req, res) => {
        const result = await BlogCategory.create(req.body)
        res.send({ // kısayol olarak doğrudan result'ı gönder
            result
        })
    },

    read: async (req, res) => {
        const result = await BlogCategory.findOne({ _id: req.params.categoryId }, { _id: 0, name: 1 }) //ilk alan filtreleme. Veride istenmeyen field varsa false yada 0 ile döndürülmeyebilir
        res.send({
            isError: false,
            result
        })
    },

    update: async (req, res) => {
        const result = await BlogCategory.updateOne({ _id: req.params.categoryId }, req.body)
        //!güncellenmek istenen veri yoksa:
        if (!result.matchedCount === 0) {
            // throw new CustomError("Eşleşen veri bulunamadı")
            return res.status(404).send("Eşleşen veri bulunamadı")
        }
        //! güncellenmek istenen veri var ama zaten güncel olduğu için güncelleme yapılmadı:
        if (result.matchedCount > 0 && result.modifiedCount === 0) {
            return res.status(200).send({ message: "Belge zaten güncel." });
        }
        res.status(202).send({
            isError: false,
            result,
            updated: await BlogCategory.findOne({ _id: req.params.categoryId }),
        });
    },

    delete: async (req, res) => {
        const result = await BlogCategory.deleteOne({ _id: req.params.categoryId })
        res.send({
            result
        })
    },
};

/* ------------------------------------------------------- */