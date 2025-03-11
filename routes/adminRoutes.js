const express=require("express")
const mongoose=require("mongoose")
const authAdmin =require("../middlewares/authAdmin")
const {adminSignUp,adminLogin,adminProfile,profileUpdate,adminLogout,profileDeactivate,deleteAccount,changePassword,checkadmin}=require("../controllers/adminController")
const router= express.Router()


//signUp
router.post("/admin-signup",adminSignUp)

//Login
router.post("/admin-login",adminLogin)

//profile fetching
router.get("/admin-profile",authAdmin,adminProfile)

//profile update
router.put("/profile-update",authAdmin,profileUpdate)

//admin-deactivate
router.get("/adminprofile-self-deactivate",authAdmin,profileDeactivate)

//delete-account
router.delete("/delete-account",authAdmin,deleteAccount)

//password-change
router.put("/change-password",authAdmin,changePassword)

//admin logout
router.get("/admin-logout",adminLogout)

module.exports=router