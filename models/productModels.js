const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    image: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    }
})

const Products = mongoose.model("Products", ProductSchema);
module.exports = Products;
