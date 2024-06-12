const { default: mongoose } = require("mongoose")

const product_schema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    productImage: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sellingprice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

const productmodel = mongoose.model("product", product_schema)
module.exports = productmodel