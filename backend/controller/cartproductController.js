const { Cart } = require("../model")
const { cart_service } = require("../service")

const addtocartcontroller = async (req, res) => {
    try {
        const { productid } = req?.body

        const currentuser = req?.userId

        const isProductAvailable = await cart_service.addtocart(productid,currentuser)
        // const isProductAvailable = await Cart.findOne({productid, userid:currentuser})

        if(isProductAvailable){
            return res.status(400).json({
                success: false,
                message: "Product already exist in cart"  
            })
        }

        const payload = {
            productid : productid,
            quantity : 1,
            userid  : currentuser
        }

        const newAddtoCart = new Cart(payload)
        const saveproduct = await newAddtoCart.save()

        res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            data: saveproduct
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const countAddtoCart = async(req,res) => {
    try {
        
        const currentuser = req?.userId
        
        const count = await Cart.countDocuments({
            userid : currentuser
        })

        res.status(200).json({
            success: true,
            data:{
                count : count
            },
            message : "success"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const addtocartviewproduct = async(req,res) => {
    try {
        const currentuser = req?.userId

        const allproduct = await cart_service.allproduct(currentuser)
        
        res.status(200).json({
            success: true,
            message: "success",
            data: allproduct
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}



const updateAddToCartProduct = async(req,res) => {
    try {
        const currentuser = req?.userId
        const cartproductid = req.body?._id
        const qty = req.body.quantity
        

        const updatecartproduct = await Cart.updateOne({ _id: cartproductid, userid: currentuser }, 
            { $set: { quantity: qty } } 
        );
        res.status(200).json({
            success: true,
            message: "product updated successfully",
            data: updatecartproduct
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const deletecartproduct = async(req,res) => {
    try {
        const currentuser = req?.userId
        const cartproductid = req.body?._id

        const deleteproduct = await cart_service.deletecartproduct({_id : cartproductid, userid : currentuser})
        res.status(200).json({
            success: true,
            message: "product deleted successfully",
            data: deleteproduct
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    addtocartcontroller,
    countAddtoCart,
    addtocartviewproduct,
    updateAddToCartProduct,
    deletecartproduct
}