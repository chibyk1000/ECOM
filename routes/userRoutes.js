const express = require('express')
const userController = require('../controllers/userControllers')
const router = express.Router()


router.post('/create-account', userController.signup )
router.post('/verify-email', userController.verifyEmail )
router.post('/login', userController.login)
router.get('/profile', userController.getUser)




module.exports = router
