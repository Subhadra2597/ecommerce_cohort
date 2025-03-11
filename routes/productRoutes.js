const express= require ("express")
const mongoose =require("mongoose")
const Product=require("../models/productmodel")
const {getProducts,addProducts,updateProducts,deleteProduct} = require("../controllers/productController")
const authSeller=require("../middlewares/authSeller")
const router= express.Router()


router.get("/get-products",getProducts)
 router.post("/create-product",authSeller,addProducts)
 router.put("/update-product",authSeller,updateProducts)
 router.delete("delete-product",authSeller,deleteProduct)
 module.exports=router