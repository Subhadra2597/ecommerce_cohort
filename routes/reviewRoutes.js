const express= require ("express")
const mongoose =require("mongoose")
const authUser=require("../middlewares/authUser")
const {addReview,getProductReviews,deleteReview,averageRating}=require("../controllers/reviewController")
const router= express.Router()

router.post("/add-review",authUser,addReview)
router.get("/get-product-review/:productId",authUser,getProductReviews)
router.delete("/delete-review/:reviewId",authUser,deleteReview)
router.get("/average-rating/:productId",averageRating)
module.exports=router