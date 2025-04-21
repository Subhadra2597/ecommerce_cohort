const express= require ("express")
const mongoose =require("mongoose")
const Product=require("../models/productmodel")
const {getProducts,getProductDetails,addProducts,updateProducts,deleteProduct} = require("../controllers/productController")
const authSeller=require("../middlewares/authSeller")
const upload=require("../middlewares/multer")
const router= express.Router()


router.get("/get-products",getProducts)
router.get("/get-ProductDetails/:productId",getProductDetails)
 router.post("/add-product",authSeller,addProducts)
 router.put("/update-product/:productId",authSeller,updateProducts)
 router.delete("/delete-product/:productId",authSeller,deleteProduct)
 module.exports=router