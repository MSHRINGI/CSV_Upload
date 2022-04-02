const File = require('../models/file');
const csv = require('fast-csv');
const fs = require('fs');

module.exports.home = async function (req, res) {

    try{

        // Finds all the files present into the database
        let allFiles = await File.find({});

        // sending data to ejs file for rendering
        return res.render('home', {
            title: "Home",
            allFiles: allFiles
        });
    }catch(err){
        console.log("Error", err);
        return res.redirect('back');
    }
}

// for uploading the file
module.exports.upload = async function (req, res) {
    try {

        // First create a file
        let createdFile = await File.create(req.body);

        // calling the static function
        File.uploadedFile(req, res, function (error) {
            if (error) {
                console.log("Error in uploading file with multer", error);
                req.flash('error', "Something is wrong");
                return res.redirect('back');
            }

            // giving name to the file
            if (req.body.name) {
                createdFile.name = req.body.name;
            } else {
                createdFile.name = req.file.filename;
            }

            // if file present
            if (req.file) {
                // open uploaded file and parse the data
                csv.parseFile(req.file.path)
                    .on("data", function (data) {
                        createdFile.arrayFile.push(data); // push each row
                    })
                    .on("end", function () {
                        createdFile.save();
                        fs.unlinkSync(req.file.path);   // remove temp file
                    })

                // for displaying the notification
                req.flash('success', "File Uploaded Successfully");
                return res.redirect('back');
            } else {
                console.log("Please upload a CSV file");
                req.flash('error', "Inavailid File");
                return res.redirect('back');
            }
        });
    } catch (err) {
        console.log("Error in uploading", err);
        req.flash('error', "Error in uploading file");
        return res.redirect('back');
    }
}