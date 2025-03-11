const mongoose=require('mongoose')

const OrderSchema = new mongoose.Schema({

    count:{
       type: Number,
       default:1

    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    isPaid:Boolean,
    orderStatus:String
    
},
{
    timestamps:true,
})

  const Order = mongoose.model('Order', OrderSchema)

  module.exports =Order