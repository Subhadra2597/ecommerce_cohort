const mongoose =require ("mongoose")
MONGO_URL=process.env.MONGO_URL
 const connectdb=()=>{
    try {
        
    mongoose.connect(MONGO_URL)
    console.log("DB connected successfully")
        
    } catch (error) {
        console.log(error)
    }
}
module.exports =connectdb