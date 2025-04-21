const Cart=require("../models/cartModel")
const Product=require("../models/productmodel")
const authUser=require("../middlewares/authUser")

const getCart=async(req,res)=>{
    try{
        const userId=req.user.id
       //const cart=await Cart.find()
       const cart=await Cart.findOne({userId}).populate("products.productId")
        if(!cart){
            return res.status(404).json({ message: "Cart not found" })
        }
        res.status(200).json({ data: cart, message: "cart fetched" })
    }catch(error){
        res.status(500).json({ message:error.message||"Internal server error" })
    }
}
const addProductToCart= async(req,res)=>{
    try {
        const userId=req.user.id
         const{productId,quantity}=req.body
        
         const product=await Product.findById(productId)
         console.log(product,"=======fetched product")
        const price=product.price
        console.log(price,"==========price")

      //  const totalPrice=()=>{
            
       // }

        if(!product){
            return res.status(404).json({message:"Product not found"})
        }


         //find if there is a cart for the user
        let cart=await Cart.findOne({userId})
        console.log(cart,"======fetchedcart")


        //if not, create one
        if(!cart){
            cart =new Cart({userId,products:[{productId,price,quantity}]})
            console.log(cart)
        }

        //check if product already in the cart
        const productExists = cart.products.some((item) => item.productId.equals(productId));
        if (productExists) {
            return res.status(400).json({ message: "product already in cart" });
        }
       cart.products.push(
           {productId,
            price,
            quantity}
        )
        cart.calculateTotalPrice()
       await cart.save()
       res.status(200).json({data:cart,message:"Products added to the cart"})

        
    } catch (error) {
        res.status(500).json({message:error.message||"internal server error"})
    }
}

const removeProductFromCart=async(req,res)=>{
    try{

    
    const userId=req.user.id
    const {productId}=req.body
        console.log(req.body,"===req.body");
        
    //find user's cart
    const cart=await Cart.findOne({userId})
    if(!cart){
        return res.status(404).json({message:"Cart not found"})
    }
    cart.products = cart.products.filter((product) => !product.productId.equals(productId))
      // Recalculate the total price
      cart.calculateTotalPrice()

      // Save the cart
      await cart.save();

      res.status(200).json({ data: cart, message: "product removed from cart" })
  } catch (error) {
      res.status(500).json({message:error.message||"internal server error"})
  }
}

const clearCart=async(req,res)=>{
    try {
        console.log("hitted")
        const userId=req.user.id
        const cart=await Cart.find({userId})
        console.log(cart)
        if(!cart){
            return res.status(404).json({message:"Cart not found"})
        }
        await Cart.deleteMany({})
        res.json({data:cart,message:"cart cleared"})
    } catch (error) {
        return res.status(500).json({message:error.message||"internal server error"})
    }
}
   
module.exports={getCart,addProductToCart,removeProductFromCart,clearCart}