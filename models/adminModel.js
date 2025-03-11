const mongoose=require('mongoose')

const adminSchema = new mongoose.Schema({
    name:
     {  type:String,
        required:true,
        minlength:2,
     },

    email:
    {
      type:String,
      required:true,
      minlength:5,
    },
    password:
    {
        type:String,
        required:true,
        minlength:5,
    },

    
    profilePic:
    {
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5xF1p6VK8Og49orezRkjBL45wGwlbvpDfcQ&s",
    },
    role:{
        type:String,
        enum:["seller","admin"],
        default:seller
    },
    isActive:
    {
        type:Boolean,
        default:true,
    }
  },
{
    timestamps:true,
})

  const Admin = mongoose.model('Admin', adminSchema)

  module.exports =Admin