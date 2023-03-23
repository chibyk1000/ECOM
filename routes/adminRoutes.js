const express = require("express");
const upload = require("../utils/multer-uploads");
const { addProducts, getAllProducts } = require("../controllers/productsController");
const router = express.Router();

router.post('/add-products', upload.single('file'), addProducts)
router.get('/get-products', getAllProducts)

module.exports = router;
