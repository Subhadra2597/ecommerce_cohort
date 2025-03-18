const multer  = require('multer')

const storage = multer.diskStorage({
  
    filename: function (req, file, cb) {
      try{

        console.log('file===',file);
        cb(null, file.originalname);
      }catch(error){
        console.log(error)
      }
    },
  })

 /* const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
      cb(null, uploadDirectory)
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })*/
const upload = multer({ storage: storage })

module.exports=upload
