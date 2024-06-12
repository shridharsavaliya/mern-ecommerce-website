const express = require('express')
const { cartcontroller } = require('../controller')
const authToken = require('../middleware/authToken')

const router = express.Router()

router.post(
    "/addtocart",
    authToken,
    cartcontroller.addtocartcontroller
)

router.get(
    "/countAddtoCart",
    authToken,
    cartcontroller.countAddtoCart
)

router.get(
    "/addtocartviewproduct",
    authToken,
    cartcontroller.addtocartviewproduct
)

router.post(
    "/updateAddToCartProduct",
    authToken,
    cartcontroller.updateAddToCartProduct
)

router.delete(
    "/deletecartproduct",
    authToken,
    cartcontroller.deletecartproduct
)

module.exports = router