const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    item: [
        {
            productId: mongoose.Schema.Types.ObjectId, 
            quantity: Number, 
            title: String,
            price: Number,
            image: String,
            quantity: {
                type: Number,
                default: 0
            }
        }
    ],
    total: {
        type: Number,
        default:0 
    },

    active: {
        type: Boolean,
        default: true
    }, 
    modifiedOn: {
        type: Date,
        default:Date.now
    }
},
{timestamps:true}
)

const CartModel =mongoose.model('Cart', CartSchema)
module.exports = CartModel