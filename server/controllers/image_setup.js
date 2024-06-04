const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../images');
        console.log(req)
        console.log("image setup")
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
        console.log(file)
        console.log(req)
        console.log("file name check in image setup")
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    console.log("worked req in image setup")
    console.log(req)
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter:fileFilter});

module.exports={upload}