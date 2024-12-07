"use strict";

const mongoose = require("mongoose");

/* ------------------------------------------------------- *

const ModelSchema = new mongoose.Schema({
    fieldName: String, // kısayolda tip belirleme
    fieldName1: {
        type: Number,
        default: 4,
        trim: true,
        unique: true,
        required: [true, "Bu alan zorunludur"],
        enum: [["Ahmet", "Zeki"], "Bu değerlerden biri olmalı"],
        velidate: [() => true, "Uyumsuz veri tipi"],
        get: (data) => data,
        set: (data) => data,
        index: true // çabuk erişime izin verir.
    }
}, {
    collection: "tableName",
    timestamps: true //oluşturulma ve değiştirilme zamanı ekler
})

const ModelName = mongoose.model("ModelName", ModelSchema)
module.exports={ModelName}

/* ------------------------------------------------------- */

//BlogCategory Schema:

const BlogCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
}, {
    collection: "BlogCategories", // collection ismi
    timestamps: true
})

module.exports={
    BlogCategory:mongoose.model("BlogCategory",BlogCategorySchema)
}
