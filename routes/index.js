const express =require ("express")
const router= express.Router()
const mongoose =require("mongoose")
const UserRouter= require("./userRoutes")
const Adminrouter=require("./adminRoutes")
const Sellerrouter=require("./sellerRoutes")
const Productrouter =require("./productRoutes")




router.use("/user",UserRouter)
router.use("/admin",Adminrouter)
router.use("/seller",Sellerrouter)
router.use("/product",Productrouter)
module.exports =router