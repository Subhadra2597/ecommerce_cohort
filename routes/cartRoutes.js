const express=require("express")
const mongoose=require("mongoose")
const authUser =require("../middlewares/authUser")
const {getCart,addProductToCart,removeProductFromCart,clearCart} = require("../controllers/cartController")
const router= express.Router()

//get cart
router.get("/get-cart",authUser,getCart)

//add to Cart
router.post("/add-to-cart",authUser,addProductToCart)

//remove from cart
router.delete("/remove-from-cart",authUser,removeProductFromCart)

//clear cart
router.delete("/clear-cart",authUser,clearCart)
module.exports=router