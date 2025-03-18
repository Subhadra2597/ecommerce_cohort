const express =require ("express")
const router= express.Router()
const mongoose =require("mongoose")
const UserRouter= require("./userRoutes")
const AdminRouter=require("./adminRoutes")
const SellerRouter=require("./sellerRoutes")
const ProductRouter =require("./productRoutes")
const cartRouter=require("./cartRoutes")
const reviewRouter=require("./reviewRoutes")




router.use("/user",UserRouter)
router.use("/admin",AdminRouter)
router.use("/seller",SellerRouter)
router.use("/product",ProductRouter)
router.use("/cart",cartRouter)
router.use("/review",reviewRouter)
module.exports =router