const Review=require("../models/reviewModel")
const Product=require("../models/productmodel")
const addReview=async(req,res)=>{
    try{
        const{productId,rating,comment}=req.body
        const userId=req.user.id
        const product=await Product.findById(productId) 
        if(!product){
            res.status(404).json({message:"product not found"})
        }
        if(rating>5||rating<1){
            res.status(404).json({message:"please provide valid rating value"})
        }

        //create or update the review
        const review=await Review.findOneAndUpdate({userId,productId},{rating,comment},{new:true,upsert:true})

        res.status(200).json({data:review,message:"Review added"})

    }catch(error){
        res.status(500).json({message:error.message||"internal server error"})
    }

}

const getProductReviews=async(req,res)=>{
    try {
        
        const{productId}=req.params
        const product=await Product.findById(productId)
        if(!product){
            res.status(404).json({message:"product not found"})
        }
        const reviews=await Review.find({productId}).populate("userId","name").sort({ createdAt: -1 })
        if(!reviews.length){
            res.status(404).json({message:"no reviews are available for this product"})
        }
        res.status(200).json({data:reviews,message:"Reviews fetched for the searched product"})
    } catch (error) {
        res.status(500).json({message:error.message||"internal server error"})
    }
}

const deleteReview=async(req,res)=>{
    try {
        const {reviewId}=req.params
        const userId=req.body.id
        const deletedReview=await Review.findOneAndDelete(reviewId)
        if(!deletedReview){
            res.status(404).json({message:"Review not found"}
            )
        }
        res.status(200).json({message:"Review deleted"})
    } catch (error) {
        res.status(500).json({message:error.message||"Internal server error"})
    }
}

const averageRating=async(req,res)=>{
    try{
        const {productId}=req.params
        const reviews = await Review.find({ productId });

        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this product"});
        }

        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

        res.status(200).json({ data: averageRating, message: "Average rating fetched" });
    }catch(error){
        res.status(500).json({ message: error.message||"Internal server error" })
    }
}
module.exports={addReview,getProductReviews,deleteReview,averageRating}