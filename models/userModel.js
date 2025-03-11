const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
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
      unique:true,
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
      default:"user"
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

  const User = mongoose.model('User', userSchema)

  module.exports =User