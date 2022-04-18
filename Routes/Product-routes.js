const express = require("express");

const productController = require("../controllers/product-controllers");

const router = express.Router();

router.post("/addproduct", productController.addProduct);
router.post("/editproduct", productController.editProduct);
router.post("/deleteproduct", productController.deleteProduct);
router.post("/getproductimages", productController.getProductImages);
router.get("/getproducts", productController.getProducts);

module.exports = router;
