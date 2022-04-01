const File = require('../models/file');
const csv = require('fast-csv');
const fs = require('fs');

module.exports.home = async function (req, res) {
    let allFiles = await File.find({});
    return res.render('home', {
        title: "Home",
        allFiles: allFiles
    });
}

module.exports.upload = async function (req, res) {
    console.log(req.body);
    try {

        let createdFile = await File.create(req.body);
        console.log("FIle we need", createdFile);

        File.uploadedFile(req, res, function (error) {
            if (error) {
                console.log("Error in uploading file with multer", error);
                return res.redirect('back');
            }

            if (req.body.name) {
                createdFile.name = req.body.name;
            } else {
                createdFile.name = req.file.filename;
            }

            if (req.file) {
                console.log("req.file = ", req.file);
                createdFile.newFile = File.filePath + '/' + req.file.filename;
                createdFile.save();

                // open uploaded file
                csv.parseFile(req.file.path)
                    .on("data", function (data) {
                        // fileRows.push(data); // push each row
                        createdFile.arrayFile.push(data);
                        
                    })
                    .on("end", function () {
                        console.log("All parsed data from parser" ,createdFile.arrayFile);
                        createdFile.save();
                        fs.unlinkSync(req.file.path);   // remove temp file
                    })
                return res.redirect('back');
            } else {
                console.log("Please upload a CSV file");
                return res.redirect('back');
            }
        });
    } catch (err) {
        console.log("Error in uploading", err);
        return res.redirect('back');
    }

}