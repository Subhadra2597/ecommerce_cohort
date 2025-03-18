

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
        
        req.user=decodedToken
       // console.log(req.user.id)
        next()
    
    
} catch (error) {
    
    console.log(error);
    res.status(error.statusCode || 500).json({ message: error.message || "Internal server" })
    
}
}
 module.exports=authUser
