const express = require("express");
const upload = require("../utils/multer-uploads");
const { addProducts, getAllProducts } = require("../controllers/productsController");
const authorize = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.post('/add-products', upload.single('file'), authorize, addProducts)
router.get('/get-products', getAllProducts)

module.exports = router;


