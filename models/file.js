const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const FILE_PATH = path.join('/uploads');

const fileSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    arrayFile:[],
},{
    timestamps: true
});

// save the file into local storage and give name to the file
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now());
    }
});

// Filter for checking the file is csv or not
const csvFilter = function(req, file, cb){
    if(file.mimetype.includes("csv")){
        cb(null, true);
    }else{
        cb("Please upload only CSV file.", false);
    }
}

// static fuction for uploading file
fileSchema.statics.uploadedFile = multer({storage: storage, fileFilter: csvFilter}).single('newFile');

const File = mongoose.model('File', fileSchema);
module.exports = File;