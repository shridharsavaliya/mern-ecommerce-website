const express = require('express')
const { productcontroller } = require('../controller')
const authToken = require('../middleware/authToken')
const router = express.Router()

router.post(
    "/uplodeproduct",
    authToken,
    productcontroller.uplodeProduct
)

router.get(
    "/getproduct",
    productcontroller.getproduct
)

router.post(
    "/updateproduct",
    authToken,
    productcontroller.updateproduct
)

router.get(
    "/getCategoryProduct",
    productcontroller.getCategoryProductOne
)

router.post(
    "/getCategoryWiseProduct",
    productcontroller.getCategoryWiseProduct
)

router.post(
    "/getProductDetail",
    productcontroller.getProductDetail
)

router.get(
    "/searchproduct",
    productcontroller.searchproduct
)

router.post(
    "/filterproduct",
    productcontroller.filterproductController
),
router.post(
    "/deleteProduct",
    productcontroller.deleteProduct
)

module.exports = router