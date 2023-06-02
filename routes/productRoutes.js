const express = require("express");
const upload = require("../utils/multer-uploads");
const authorize = require('../middlewares/AuthMiddleware')
const {
  addProducts,
    getAllProducts,
    getSingleProduct,
    editProduct,
  deleteProduct
} = require("../controllers/productsController");
const router = express.Router();

router.post("/add-products", authorize, addProducts);
router.get("/get-products",  getAllProducts);

router.get('/single/:title', getSingleProduct)
router.patch("/single/:title", authorize, editProduct);
router.delete("/single/:title", authorize, deleteProduct);

module.exports = router;
