const multer = require('multer');
const path = require('path');
// const UPLOAD_PATH = path.join(__dirname, '..')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now());
    }
});

const csvFilter = function(req, file, cb){
    if(file.mimetype.includes("csv")){
        cb(null, true);
    }else{
        cb("Please upload only CSV file.", false);
    }
}

const Upload = multer({storage: storage, fileFilter: csvFilter});
module.exports = Upload;