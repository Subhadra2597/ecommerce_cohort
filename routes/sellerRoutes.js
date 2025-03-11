const express=require("express")
const mongoose=require("mongoose")
const authSeller =require("../middlewares/authSeller")
const {sellerSignUp,sellerLogin,sellerProfile,profileUpdate,sellerLogout,profileDeactivate,deleteAccount,changePassword,checkseller}=require("../controllers/sellerController")
const router= express.Router()


//signUp
router.post("/seller-signup",sellerSignUp)

//Login
router.post("/seller-login",sellerLogin)

//profile fetching
router.get("/seller-profile",authSeller,sellerProfile)

//profile update
router.put("/profile-update",authSeller,profileUpdate)

//seller-deactivate
router.get("/sellerprofile-self-deactivate",authSeller,profileDeactivate)

//delete-account
router.delete("/delete-account",authSeller,deleteAccount)

//password-change
router.put("/change-password",authSeller,changePassword)

//seller logout
router.get("/seller-logout",sellerLogout)

module.exports=router