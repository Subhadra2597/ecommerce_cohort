const Product =require ("../models/productmodel")

const getProducts=async(req,res)=>{

    const fetchedProducts=await Product.find()
    res.json({data:fetchedProducts ,message:"Fetched all products"})
}


const addProducts= async(req,res)=>{
    try{
       const { title, description, price, image } = req.body
       const newProducts = new Product({title, description, price, image})
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
         const updatedProducts=await Product.findOneAndUpdate()
         res.json({data:updatedProducts,message:"Products updated successfully"})
      } 
   const deleteProduct=async(req,res)=>{
      
   }
      module.exports={getProducts,addProducts,updateProducts,deleteProduct}