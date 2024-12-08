"use strict";

// Mongoose:

const mongoose = require("mongoose");

//BlogPostSchema:
const BlogPostSchema = new mongoose.Schema({
    name: {
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BlogCategory", // diğer tablo ile ilişkilendirme
            required: true
        },
        title: {
            type: String,
            trim: true,
            required: true
        },
        content: {  // BlogCategory tablosu ile ilişkilendirme
            type: String,
            trim: true,
            required: true
        } 
    }
}, {
    collection: "blogPosts", // collection ismi
    timestamps: true
})

module.exports = {
    BlogPost: mongoose.model("BlogPost", BlogPostSchema)
}
