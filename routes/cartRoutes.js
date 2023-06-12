const express = require('express')

const router = express.Router()
const { addToCart, getCart, decrementItem, deleteCartItem, incrementCartItem } = require('../controllers/cartController')
const authorize = require('../middlewares/AuthMiddleware')
 
router.get('/',authorize, getCart)
router.post('/add', authorize, addToCart)
router.post('/increment', authorize, incrementCartItem)
router.post('/decrement',authorize, decrementItem)
router.post('/delete-item',authorize, deleteCartItem)
module.exports = router