const express = require('express')
const userController = require('../controllers/userControllers')
const router = express.Router()
const authorize = require('../middlewares/AuthMiddleware')

router.post('/create-account', userController.signup )
router.post('/verify-email', userController.verifyEmail )
router.post('/login', userController.login)
router.get('/profile',authorize, userController.getUser)




module.exports = router
