const multer = require('multer');
const path = require("path");


const storage_multer = multer.diskStorage({
    destination: 'src/public/uploads',
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
})

const return_multer = multer({storage: storage_multer});

module.exports = return_multer;
