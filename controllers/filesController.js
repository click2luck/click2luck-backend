const { upload } = require('../multer/configMulter.js')
console.log(upload)

const uploadSingle = upload.single('file');
//upload.single('file');
const uploadFiles = (req,res)=>{ //aqui se recibe el archivo y se trata con upload
    console.log("recibido")
    res.json("va")
    }

module.exports = {uploadFiles, uploadSingle};

