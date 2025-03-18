const cloudinary = require('cloudinary').v2

    // Configuration
   const cloudinaryInstance= cloudinary.config({ 
        cloud_name:process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
    })
    
    module.exports=cloudinaryInstance