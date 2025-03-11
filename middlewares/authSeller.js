var jwt = require('jsonwebtoken')

const authUser=(req,res,next)=>{
    try {
        
        console.log(req.cookies)
        let {token}=  req.cookies
        if (!token) {
            return res.status(401).json({ message: "user not authorized" })
        }
        //decode token
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decodedToken,"decoded token")
        
        if(!decodedToken){
            return res.status(401).json({ message: "user not authorized" })
        }
        if(decodedToken.role!=="admin" && decodedToken.role!=="seller"){
            return res.status(401).json({ message: "user not authorized" })
        }
        req.user=decodedToken
        next()
    
    
} catch (error) {
    
    console.log(error);
    res.status(error.statusCode || 500).json({ message: error.message || "Internal server" })
    
}
}
 module.exports=authUser
