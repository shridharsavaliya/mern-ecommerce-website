const { Cart } = require("../model")

const addtocart = (productid, currentuser) => {
    return Cart.findOne({productid, userid:currentuser})
}

const allproduct = (currentuser) => {
    return Cart.find({userid : currentuser}).populate("productid")
}

const deletecartproduct = (productid) => {
    return Cart.deleteOne(productid)
}


module.exports = { 
    addtocart,
    allproduct,
    deletecartproduct
 }