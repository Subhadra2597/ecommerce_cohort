const mongoose=require('mongoose')

const wishListSchema = new mongoose.Schema({

    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},
{
    timestamps:true,
})

  const  WishList= mongoose.model('WishList', wishListSchema)

  module.exports =WishList