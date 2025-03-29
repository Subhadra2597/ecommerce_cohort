const User=require("../models/userModel")
const bcrypt = require('bcrypt')
const generateToken=require("../utils/token")
const authUser=require("../middlewares/authUser")

//sign up
const userSignUp =async(req,res)=>{
    try{
        //data collection
        const{name,email,password,profilePic}=req.body
    
        //data validation
        if(!name||!email||!password){
           return res.status(400).json({message:"all fields required"})
        }
        //checking if user already exists
        const userExist= await User.findOne({email})
        if(userExist){
            return res.json({message:"User already exist"})
        }
        //hashing the obtained password
       const hashedPassword=bcrypt.hashSync(password, 10)
    
    
        const newUser=new User({name,email,password:hashedPassword,profilePic})
        await newUser.save()
    
        //generate token usig Id and role
        const token = generateToken(newUser._id, "user")
        res.cookie("token", token);
    
        res.json({ data: newUser, message: "signup success" })
    }
   catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || "Internal server" })
    console.log(error);
}
    
}

//login
const userLogin= async(req,res)=>{
    try {
        const{email,password}=req.body
        
        //data validation
        if(!email||!password){
            return res.status(400).json({message:"all fields required"})
        }
        
        //checking if it is a registered user
        const userExist= await User.findOne({email})
        if(!userExist){
            
           return res.status(404).json({message:"User not found"})
        }
        //checking password
        console.log(password)
        console.log(userExist.password)
        
        const passwordMatch = bcrypt.compareSync(password, userExist.password)
        
        if(!passwordMatch){
            return res.status(401).json({message:"Inavlid login credentials"})
        }

        if(!userExist.isActive){
            return res.status(401).json({message:"User account is not active"})
         }
         
         //generate token usig Id and role
         const token = generateToken(userExist._id, "user")
         res.cookie("token", token)
         delete userExist._doc.password
         
         res.json({ data: userExist, message: "login success" })
         
        } catch (error) {
            res.status(error.statusCode || 500).json({ message:  "Internal server error" })
            console.log(error)
        }
    }
    
    //Fetching Profile
    const userProfile=async (req,res)=>{
        try{
            
            const userId=req.user.id
            const fetchedProfile= await User.findById(userId).select("-password")
            console.log(fetchedProfile)
            res.json({data:fetchedProfile, message:"user profile fetched"})    
        }catch(error){
            return res.status(404).json({message:error.message ||"user not found"})
        }
    }
    
    //profile Update
    const profileUpdate=async(req,res)=>{
        try {
            const userId=req.user.id
            const {name,email,password,profilePic}=req.body
            const updatedProfile= await User.findByIdAndUpdate(userId,{name,email,password,profilePic},{new:true})
            res.json({data:updatedProfile,message:"Profile updated successfully"})
        } catch (error) {
            return res.status(500).json({message:error.message||"Internal server error"})
        }
        
    }

    //profile-self-deactivate
    const profileDeactivate=async(req,res)=>{
        try{
            const userId=req.user.id
            const userData=await User.findByIdAndUpdate(userId,{isActive:false},{new:true})
            res.json({data:userData,message:"User Profile deactivated"})
            
        }catch(error){
            return res.status(500).json({message:error.message||"Internal server error"})
        }
    }
    
    //user logout
    
    const userLogout= async(req,res)=>{
        try{
            res.clearCookie("token")
            res.json({message:"User logged out successfully"})
        }catch(error){
            return res.status(500).json({message:error.message||"Internal server error"})
        }
    }
    //delete account

    const deleteAccount=async(req,res)=>{
        try {
           const userId=req.user.id
           const userData=await User.findByIdAndDelete(userId)
            res.json({message:"User account deleted"})
        } catch (error) {
            return res.status(500).json({message:error.message||"Internal server error"})
        }
    }

    //change-password
    const changePassword=async (req,res)=>{
        try{
            const userId=req.user.id
            const{password}=req.body
             //hashing the obtained password
            const hashedPassword=bcrypt.hashSync(password, 10)
    
            const userData= await User.findByIdAndUpdate(userId,{password:hashedPassword},{new:true})

            res.json({data:userData,message:"Password updated successfully"})

        }catch(error){
            return res.status(500).json({message:error.message||"Internal server error"})
        }
    }
    //check user

    const checkUser = async (req, res, next) => {
        try {
    
            res.json({  message: "user autherized" });
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message || "Internal server" });
        }
    };
    
    module.exports= {userSignUp,userLogin,userProfile,profileUpdate,userLogout,profileDeactivate,deleteAccount,changePassword,checkUser}