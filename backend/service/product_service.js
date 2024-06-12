const { Product } = require("../model")

const get_product = () => {
    return Product.find({}).sort({createdAt:-1})
}

const update_product = (id,data) => {
    return Product.findByIdAndUpdate(id,{$set:data})
}

const getCategoryProduct = () => {
    return Product.distinct("category")
}

const getCategoryWiseProduct = (category) => {
    return Product.find({category})
}

const getProductDetail = (id) => {
    return Product.findById(id)
}


const searchproduct = (regex) => {
    return Product.find({
        "$or" : [
            {
                productName : regex
            },
            {
                category : regex
            }
        ]
    })
}

const filterCategorylist = (categoryList) => {
    return Product.find({category : {"$in" : categoryList}})
}

module.exports = {
    get_product,
    update_product,
    getCategoryProduct,
    getCategoryWiseProduct,
    getProductDetail,
    searchproduct,
    filterCategorylist
}