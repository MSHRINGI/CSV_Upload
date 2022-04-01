const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const FILE_PATH = path.join('/uploads');

const fileSchema = new mongoose.Schema({
    name:{
        type: String,
        // unique: true,
        // required: true
    },
    newFile: {
        type: String,
        // required: true
    },
    arrayFile:[]
},{
    timestamps: true
});

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

fileSchema.statics.uploadedFile = multer({storage: storage, fileFilter: csvFilter}).single('newFile');
fileSchema.statics.filePath = FILE_PATH;

const File = mongoose.model('File', fileSchema);
module.exports = File;