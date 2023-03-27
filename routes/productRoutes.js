const express = require("express");
const upload = require("../utils/multer-uploads");
const {
  addProducts,
    getAllProducts,
    getSingleProduct,
    editProduct,
  deleteProduct
} = require("../controllers/productsController");
const router = express.Router();

router.post("/add-products", upload.single("file"), addProducts);
router.get("/get-products", getAllProducts);

router.get('/single/:title', getSingleProduct)
router.patch('/single/:title', editProduct)
router.delete('/single/:title', deleteProduct)

module.exports = router;
