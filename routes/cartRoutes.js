const express = require('express')

const router = express.Router()
const { addToCart, getCart, removeFromCart, deleteCart } = require('../controllers/cartController')
const authorize = require('../middlewares/AuthMiddleware')
 
router.post('/',authorize, getCart)
router.post('/add',authorize, addToCart)
router.post('/remove',authorize, removeFromCart)
router.post('/delete',authorize, deleteCart)
module.exports = router