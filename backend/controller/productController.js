const uplodeproductpermission = require("../helpers/permission")
const { Product } = require("../model")
const { product_service } = require("../service")

const uplodeProduct = async (req, res) => {
    try {

        const sessionid = req.userId

        if (!uplodeproductpermission(sessionid)) {
            throw new Error("permission denied")
        }

        const uplodeproduct = new Product(req.body)
        const saveproduct = await uplodeproduct.save()

        res.status(201).json({
            success: true,
            message: "product uplode successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getproduct = async (req, res) => {
    try {
        const get_product = await product_service.get_product()

        if (!get_product) {
            throw new Error("product not found")
        }

        res.status(200).json({
            success: true,
            message: "get_product successfully",
            data: get_product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const updateproduct = async (req, res) => {
    try {
        if (!uplodeproductpermission(req.userId)) {
            throw new Error("permission denied")
        }
        const update_product = await product_service.update_product(req.body._id, req.body)
        console.log("update", update_product)
        if (!update_product) {
            throw new Error("product not updated")
        }
        res.status(200).json({
            success: true,
            message: "product updated successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getCategoryProductOne = async (req, res) => {
    try {
        const productcategory = await product_service.getCategoryProduct()

        console.log("productcategory", productcategory)

        const productbycategory = []

        for (const category of productcategory) {
            const product = await Product.findOne({ category })

            if (product) {
                productbycategory.push(product)
            }
        }
        res.status(200).json({
            success: true,
            message: "get product by category successfully",
            data: productbycategory
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getCategoryWiseProduct = async (req, res) => {
    try {

        const product = await product_service.getCategoryWiseProduct(req.body.category)
        if (!product) {
            throw new Error("product not found")
        }
        res.status(200).json({
            success: true,
            message: "get product by category successfully",
            data: product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getProductDetail = async (req, res) => {
    try {
        const { productid } = req.body
        const product = await product_service.getProductDetail(productid)

        console.log("product", product)
        if (!product) {
            throw new Error("product not found")
        }
        res.status(200).json({
            success: true,
            message: "get product detail successfully",
            data: product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const searchproduct = async (req, res) => {
    try {
        const query = req.query.q
        // console.log(query)

        const regex = new RegExp(query, "i", "g")
        const product = await product_service.searchproduct(regex)

        res.status(200).json({
            success: true,
            message: "search product successfully",
            data: product
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const filterproductController = async (req, res) => {
    try {
        const categoryList = req.body?.category || []
        const product = await product_service.filterCategorylist(categoryList)

        res.status(200).json({
            success: true,
            message: "filter product successfully",
            data: product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req?.body?.productId
        // console.log(productId)
        const deleteProduct = await Product.deleteOne({_id:productId})

        res.status(200).json({
            success: true,
            message: "delete product successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    uplodeProduct,
    getproduct,
    updateproduct,
    getCategoryProductOne,
    getCategoryWiseProduct,
    getProductDetail,
    searchproduct,
    filterproductController,
    deleteProduct
}