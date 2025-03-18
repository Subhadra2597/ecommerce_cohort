const Product =require ("../models/productmodel")
const cloudinaryInstance=require("../config/clodinary")

const getProducts=async(req,res)=>{
   try {
      const fetchedProducts= await Product.find().select("-description -quantity")
      res.json({data:fetchedProducts ,message:"Fetched all products"})
   }
      
   catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Internal server" })
}}

const getProductDetails=async(req,res)=>{
   try {
      const {productId}=req.params
      console.log(productId)
      const productDetails= await Product.findById(productId)
      
      res.json({data:productDetails ,message:"Fetched the product details"})
   } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Internal server" })
   }
}

const addProducts= async(req,res)=>{
    try{
       const { title, description, price, image,quantity,seller } = req.body
       const sellerId = req.user.id

       const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path)
       console.log(cloudinaryRes)
       const newProducts =  new Product({title, description, price, image,quantity,seller:sellerId})
       await newProducts.save()
       /*const newProducts=Product.create({
          title:req.body.title,
          description:req.body.description,
          price:req.body.price,
          image:req.body.image
       })*/
          res.json({data:newProducts, message:"Products added successfully"})

        }catch(error){
           res.json({message:error.message})
        }
      }
     const updateProducts= async (req,res)=>{
      try {
         const {productId}=req.params
         const sellerId = req.user.id
         const { title, description, price, image,quantity,seller} = req.body
         const updatedProducts=await Product.findByIdAndUpdate(productId,{title, description, price, image,quantity,seller:sellerId},{new:true})
         res.json({data:updatedProducts,message:"Products updated successfully"})
         
      } catch (error) {
         res.status(error.statusCode || 500).json({ message: error.message || "Internal server" })
      }
      } 
   const deleteProduct=async(req,res)=>{
      try{
         console.log("reached delete controller")
         const {productId}=req.params
         console.log(productId)
         const deleteProduct= await Product.findByIdAndDelete(productId)
         res.json({message:"Product deleted"})
      }catch(error){
         console.log(error)
         res.status(error.statusCode || 500).json({ message: error.message || "Internal server" })
      }

   }
      module.exports={getProducts,getProductDetails,addProducts,updateProducts,deleteProduct}