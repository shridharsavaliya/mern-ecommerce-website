const { default: mongoose } = require("mongoose")

const cartproduct_schema = new mongoose.Schema({
    productid: {
        type:mongoose.Types.ObjectId,
        ref:"product"
    },
    quantity: {
        type:Number,
        required:true
    },
    userid: {
        type:String,
        required:true
    }
}, {
    timestamps: true,
    versionKey: false
})

const cartproductmodel = mongoose.model("cartproduct", cartproduct_schema)
module.exports = cartproductmodel