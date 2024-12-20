"use strict";

module.exports = async (req, res, next) => {
    //! FİLTRELEME - ARAMA - SIRALAMA - SAYFALAMA 

    // console.log(req.query)

    //! FİLTRELEME
    // URL?filter[fieldName]
    const filter = req.query?.filter || {}
    // console.log(filter)

    //! ARAMA
    // URL?search[fieldName]
    const search = req.query?.search || {}
    // console.log(search)
    for (let key in search) {
        search[key] = { $regex: search[key], $options: "i" }
    }
    // console.log(search)

    //! SIRALAMA
    // URL?sort[fieldName1]=asc&sort[fieldName2]=desc (asc: A-Z, desc: Z-A)
    const sort = req.query?.sort || {}

    //! SAYFALAMA

    //* LIMIT
    let limit = Number(req.query.limit)
    limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 20)
    // console.log(limit, typeof limit)

    //*SAYFA
    let page = Number(req.query.page)
    page = page > 0 ? page : 1

    //*SKIP
    let skip = Number(req.query.skip)
    skip = skip > 0 ? skip : ((page - 1) * limit)
    console.log(page, skip, limit)

    // const data = await BlogPost.find().populate("categoryId")
    // const data = await BlogPost.find({ ...filter, ...search }).sort(sort).limit(limit).skip(skip).populate(["userId", "categoryId"])

    res.getModelList = async function (Model, populate = null) {
        return await Model.find({ ...filter, ...search }).sort(sort).limit(limit).skip(skip).populate(populate)
    }

    res.getModelListDetails = async function (Model) {
        const data = await Model.find({ ...filter, ...search })

        let details = {
            filter,
            search,
            sort,
            skip,
            limit,
            page,
            pages: {
                previous: (page > 1 ? page - 1 : false), // 0.sayfada -1 göstermesin diye 
                current: page,
                next: (page + 1),
                total: Math.ceil(data.length / limit)
            },
            totalRecords: data.length
        }
        if (details.pages.next > details.pages.total) details.pages.next = false // son sayfada ise next olmayacak
        if (details.totalRecords <= limit) details.pages = false // eğer limit büyükse pages'i false yap.
        return details
    }
    next()
}

