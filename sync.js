"use strict";

const { User } = require("./src/models/user.model")
const { BlogCategory } = require("./src/models/blogCategory.model")
const { BlogPost } = require("./src/models/blogPost.model")

/* ------------------------------------------------------- */

module.exports = async () => {

    /* Örnek Veri */
    // Bütün kayıtları siler:
    await User.deleteMany().then(() => console.log( "- Tüm User içeriği silindi"))
    await BlogCategory.deleteMany().then(() => console.log(" - Tüm BlogCategory içerği silindi"))
    await BlogPost.deleteMany().then(() => console.log(" - Tüm BlogPost içerği silindi"))

    // Örnek User:
    const user = await User.create({
        email: "test@test.com",
        password: "12345678",
        firstName: "Test",
        lastName: "Test"
    })
    // Örnek Category:
    const blogCategory = await BlogCategory.create({
        name: 'Test Category'
    })
    // Örnek Posts:
    for (let key in [...Array(200)]) {
        await BlogPost.create({
            userId: user._id,
            categoryId: blogCategory._id,
            title: `test ${key} title`,
            content: `test ${key} content`,
            published: Boolean(key % 2)
        })
    }

    // Bitiş:
    console.log('* Eşleştirildi.')

}

/* ------------------------------------------------------- */