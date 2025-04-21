const Seller=require("../models/sellerModel")
const bcrypt = require('bcrypt')
const generateToken=require("../utils/token")
const NODE_ENV=process.env.NODE_ENV

//sign up
const sellerSignUp =async(req,res)=>{
    try{
        //data collection
        const{name,email,password,profilePic}=req.body
    
        //data validation
        if(!name||!email||!password){
           return res.status(400).json({message:"all fields required"})
        }
        //checking if user already exists
        const sellerExist= await Seller.findOne({email})
        if(sellerExist){
            return res.json({message:"Seller already exist"})
        }
        //hashing the obtained password
       const hashedPassword=bcrypt.hashSync(password, 10)
    
    
        const newSeller=new Seller({name,email,password:hashedPassword,profilePic})
        await newSeller.save()
    
        //generate token usig Id and role
        const token = generateToken(newSeller._id, "seller")
        res.cookie("token", token,{
            sameSite: NODE_ENV === "production" ? "None" : "Lax",
            secure: NODE_ENV === "production",
            httpOnly: NODE_ENV === "production",
        });
    
        res.json({ data: newSeller, message: "signup success" })
    }
   catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || "Internal server" })
    console.log(error);
}
    
}

//login
const sellerLogin= async(req,res)=>{
    try {
        const{email,password}=req.body
        
        //data validation
        if(!email||!password){
            return res.status(400).json({message:"all fields required"})
        }
        
        //checking if it is a registered user
        const sellerExist= await Seller.findOne({email})
        if(!sellerExist){
            
           return res.status(404).json({message:"Seller not found"})
        }
        //checking password
        const passwordMatch = bcrypt.compareSync(password, sellerExist.password)
        
        if(!passwordMatch){
            return res.status(401).json({message:"Inavlid login credentials"})
        }

        if(!sellerExist.isActive){
            return res.status(401).json({message:"Seller account is not active"})
         }
         
         //generate token usig Id and role
         const token = generateToken(sellerExist._id, "seller")
         res.cookie("token", token,{
            sameSite: NODE_ENV === "production" ? "None" : "Lax",
            secure: NODE_ENV === "production",
            httpOnly: NODE_ENV === "production",
        })
         delete sellerExist._doc.password
         
         res.json({ data: sellerExist, message: "login success" })
         
        } catch (error) {
            res.status(error.statusCode || 500).json({ message:  "Internal server error" })
            console.log(error)
        }
    }
    //Fetching Profile
    const sellerProfile=async (req,res)=>{
        try{
            
            const sellerId=req.user.id
            const fetchedProfile= await Seller.findById(sellerId).select("-password")
            console.log(fetchedProfile)
            res.json({data:fetchedProfile, message:"seller profile fetched"})    
        }catch(error){
            return res.status(404).json({message:error.message ||"seller not found"})
        }
    }
    //profile Update
    const profileUpdate=async(req,res)=>{
        try {
            const sellerId=req.user.id
            const {name,email,password,profilePic}=req.body
            const updatedProfile= await Seller.findByIdAndUpdate(sellerId,{name,email,password,profilePic},{new:true})
            res.json({data:updatedProfile,message:"Profile updated successfully"})
        } catch (error) {
            return res.status(500).json({message:error.message||"Internal server error"})
        }
        
    }

    //profile-self-deactivate
    const profileDeactivate=async(req,res)=>{
        try{
            const sellerId=req.user.id
            const sellerData=await Seller.findByIdAndUpdate(sellerId,{isActive:false},{new:true})
            res.json({data:sellerData,message:"seller Profile deactivated"})
            
        }catch(error){
            return res.status(500).json({message:error.message||"Internal server error"})
        }
    }

    //seller logout
    
    const sellerLogout= async(req,res)=>{
        try{
            res.clearCookie("token",{
                sameSite: NODE_ENV === "production" ? "None" : "Lax",
                secure: NODE_ENV === "production",
                httpOnly: NODE_ENV === "production",
            })
            res.json({message:"seller logged out successfully"})
        }catch(error){
            return res.status(500).json({message:error.message||"Internal server error"})
        }
    }
    //delete account

    const deleteAccount=async(req,res)=>{
        try {
           const sellerId=req.user.id
           const sellerData=await Seller.findByIdAndDelete(sellerId)
            res.json({message:"seller account deleted"})
        } catch (error) {
            return res.status(500).json({message:error.message||"Internal server error"})
        }
    }

    //change-password
    const changePassword=async (req,res)=>{
        try{
            const sellerId=req.user.id
            const{password}=req.body
             //hashing the obtained password
            const hashedPassword=bcrypt.hashSync(password, 10)
    
            const sellerData= await Seller.findByIdAndUpdate(sellerId,{password:hashedPassword},{new:true})

            res.json({data:sellerData,message:"Password updated successfully"})

        }catch(error){
            return res.status(500).json({message:error.message||"Internal server error"})
        }
    }

    module.exports= {sellerSignUp,sellerLogin,sellerProfile,profileUpdate,sellerLogout,profileDeactivate,deleteAccount,changePassword}