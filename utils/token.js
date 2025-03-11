var jwt = require('jsonwebtoken')


const generateToken=(id,role)=>{
    try{
        const token = jwt.sign({ id,role }, process.env.SECRET_KEY)
        console.log(token)
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
            console.log(decodedToken,"decoded token")
    
        return token

    }catch(error){
        console.log(error)
    }
}
module.exports=generateToken