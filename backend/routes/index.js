const express = require('express')

const router = express.Router()

const user_router = require('./user_route')
router.use('/user',user_router)

const product_router = require("./product_route")
router.use("/product",product_router)

const cart_router = require("./cartproduct_route")
router.use("/cart",cart_router)

module.exports = router