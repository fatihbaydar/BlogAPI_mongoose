"use strict";

// Modelleri çağırma:
const { BlogPost } = require("../models/blogPost.model");
const { NotFoundError } = require("../errors/customError");

module.exports.blogPost = {
    list: async (req, res) => {

        const data = await res.getModelList(BlogPost, ["userId", "categoryId"])

        // //! FİLTRELEME - ARAMA - SIRALAMA - SAYFALAMA 

        // // console.log(req.query)

        // //! FİLTRELEME
        // // URL?filter[fieldName]
        // const filter = req.query?.filter || {}
        // // console.log(filter)

        // //! ARAMA
        // // URL?search[fieldName]
        // const search = req.query?.search || {}
        // // console.log(search)
        // for (let key in search) {
        //     search[key] = { $regex: search[key], $options: "i" }
        // }
        // // console.log(search)

        // //! SIRALAMA
        // // URL?sort[fieldName1]=asc&sort[fieldName2]=desc (asc: A-Z, desc: Z-A)
        // const sort = req.query?.sort || {}

        // //! SAYFALAMA

        // //* LIMIT
        // let limit = Number(req.query.limit)
        // limit = limit > 0 ? limit :Number(process.env?.PAGE_SIZE ||20)
        // // console.log(limit, typeof limit)

        // //*SAYFA
        // let page = Number(req.query.page)
        // page = page > 0 ? page:1

        // //*SKIP
        // let skip = Number(req.query.skip)
        // skip = skip > 0 ? skip:((page-1)*limit)
        // console.log(page,skip,limit)

        // // const data = await BlogPost.find().populate("categoryId")
        // const data = await BlogPost.find({ ...filter, ...search }).sort(sort).limit(limit).skip(skip).populate(["userId", "categoryId"])

        // Fİltreleme ... başlığı ile başlayan kısımdan buraya kadar olan yer findSearchSortPage.js'e taşındı.

        res.send({
            result: data,
        });
    },

    //? CRUD ->

    create: async (req, res) => {
        //login olunmuşsa userId'yi req.user'dan alma
        if (req.user) req.body.userId = req.user._id

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


