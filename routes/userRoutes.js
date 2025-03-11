const express=require("express")
const mongoose=require("mongoose")
const authUser =require("../middlewares/authUser")
const {userSignUp,userLogin,userProfile,profileUpdate,userLogout,profileDeactivate,deleteAccount,changePassword,checkUser}=require("../controllers/userController")
const router= express.Router()


//signUp
router.post("/user-signup",userSignUp)

//Login
router.post("/user-login",userLogin)

//profile fetching
router.get("/user-profile",authUser,userProfile)

//profile update
router.put("/profile-update",authUser,profileUpdate)

//user-deactivate
router.get("/userprofile-self-deactivate",authUser,profileDeactivate)

//delete-account
router.delete("/delete-account",authUser,deleteAccount)

//password-change
router.put("/change-password",authUser,changePassword)

//user logout
router.get("/user-logout",userLogout)

//check user
router.get("/check-user", authUser, checkUser)
module.exports=router