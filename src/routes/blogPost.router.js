"use strict";


const router = require("express").Router();
const {blogPost} = require("../controllers/blogPost.controller")
// Call Controllers:

/* ------------------------------------------------------- */

// URL: /blog ->
// /blog/post
// BlogPost
router.route("/post").get(blogPost.list).post(blogPost.create)
router.route("/post/:postId")
    .get(blogPost.read)
    .put(blogPost.update)
    .patch(blogPost.update)
    .delete(blogPost.delete)

module.exports = router

