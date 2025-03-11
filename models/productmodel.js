const mongoose=require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:String
    },
    image:{
        type:String,
        default:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },

    },
{
    timestamps:true,
})

  const Product = mongoose.model('Product', productSchema)

  module.exports =Product