const multer = require('multer')
const mimeTypes = require('mime-types');
const path = require('path')

const storage = multer.diskStorage({ //configuraciones de almacenamiento
  destination: 'uploads/',
  filename : (req,file,cb)=>{
   cb("", Date.now()+  file.originalname + "." + mimeTypes.extension(file.mimetype)); //Eligiendo el nombre del archivo
     }       
  })

  const whitelist = [
    'application/pdf',
    
  ]
  const upload = multer({ //
    storage: storage, //eligiendo la configuracion del almacenamiento
    limits: {
      fieldNameSize: 300,
      fileSize:  52428810, // 1 Mb
    },
    fileFilter: (req, file, cb) => {
      if (!whitelist.includes(file.mimetype)) {
        return cb(new Error('file is not allowed'))
      }
  
      cb(null, true)
    }
 })

   console.log(upload)
   module.exports = {upload}