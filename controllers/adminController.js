const Admin=require("../models/adminModel")
const bcrypt = require('bcrypt')
const generateToken=require("../utils/token")
const authUser=require("../middlewares/authAdmin")

//sign up
const adminSignUp =async(req,res)=>{
    try{
        //data collection
        const{name,email,password,profilePic}=req.body
    
        //data validation
        if(!name||!email||!password){
           return res.status(400).json({message:"all fields required"})
        }
        //checking if user already exists
        const adminExist= await Admin.findOne({email})
        if(adminExist){
            return res.json({message:"Admin already exist"})
        }
        //hashing the obtained password
       const hashedPassword=bcrypt.hashSync(password, 10)
    
    
        const newAdmin=new Admin({name,email,password:hashedPassword,profilePic})
        await newAdmin.save()
    
        //generate token usig Id and role
        const token = generateToken(newAdmin._id, "admin")
        res.cookie("token", token);
    
        res.json({ data: newAdmin, message: "signup success" })
    }
   catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || "Internal server" })
    console.log(error);
}
    
}

//login
const adminLogin= async(req,res)=>{
    try {
        const{name,email,password}=req.body
        
        //data validation
        if(!name||!email||!password){
            return res.status(400).json({message:"all fields required"})
        }
        
        //checking if it is a registered user
        const adminExist= await Admin.findOne({email})
        console.log(adminExist)
        if(!adminExist){
            
           return res.status(404).json({message:"Admin not found"})
        }
        //checking password
        console.log(password)
        console.log(adminExist.password)
        const passwordMatch = bcrypt.compareSync(password, adminExist.password)
        if(!passwordMatch){
            return res.status(401).json({message:"Invalid login credentials"})
        }

        if(!adminExist.isActive){
            return res.status(401).json({message:"Admin account is not active"})
         }
         
         //generate token usig Id and role
         const token = generateToken(adminExist._id, "admin")
         res.cookie("token", token)
         delete adminExist._doc.password
         
         res.json({ data: adminExist, message: "login success" })
         
        } catch (error) {
            res.status(error.statusCode || 500).json({ message:  "Internal server error" })
            console.log(error)
        }
    }
    //Fetching Profile
    const adminProfile=async (req,res)=>{
        try{
            
            const adminId=req.user.id
            const fetchedProfile= await Admin.findById(adminId).select("-password")
            console.log(fetchedProfile)
            res.json({data:fetchedProfile, message:"admin profile fetched"})    
        }catch(error){
            return res.status(404).json({message:error.message ||"admin not found"})
        }
    }
    //profile Update
    const profileUpdate=async(req,res)=>{
        try {
            const adminId=req.user.id
            const {name,email,password,profilePic}=req.body
            const updatedProfile= await Admin.findByIdAndUpdate(adminId,{name,email,password,profilePic},{new:true})
            res.json({data:updatedProfile,message:"Profile updated successfully"})
        } catch (error) {
            return res.status(500).json({message:error.message||"Internal server error"})
        }
        
    }

    //profile-self-deactivate
    const profileDeactivate=async(req,res)=>{
        try{
            const adminId=req.user.id
            const adminData=await Admin.findByIdAndUpdate(adminId,{isActive:false},{new:true})
            res.json({data:adminData,message:"Admin Profile deactivated"})
            
        }catch(error){
            return res.status(500).json({message:error.message||"Internal server error"})
        }
    }

    //admin logout
    
    const adminLogout= async(req,res)=>{
        try{
            res.clearCookie("token")
            res.json({message:"Admin logged out successfully"})
        }catch(error){
            return res.status(500).json({message:error.message||"Internal server error"})
        }
    }
    //delete account

    const deleteAccount=async(req,res)=>{
        try {
           const adminId=req.user.id
           const adminData=await Admin.findByIdAndDelete(adminId)
            res.json({message:"Admin account deleted"})
        } catch (error) {
            return res.status(500).json({data:adminData,message:error.message||"Internal server error"})
        }
    }

    //change-password
    const changePassword=async (req,res)=>{
        try{
            const adminId=req.user.id
            const{password}=req.body
             //hashing the obtained password
            const hashedPassword=bcrypt.hashSync(password, 10)
    
            const adminData= await Admin.findByIdAndUpdate(adminId,{password:hashedPassword},{new:true})

            res.json({data:adminData,message:"Password updated successfully"})

        }catch(error){
            return res.status(500).json({message:error.message||"Internal server error"})
        }
    }

    module.exports= {adminSignUp,adminLogin,adminProfile,profileUpdate,adminLogout,profileDeactivate,deleteAccount,changePassword}