const File = require('../models/file');

// For showing the data from clicked file into the table
module.exports.showFile = async function (req, res) {

    try {

        // First find the id througn params id from database
        let file = await File.findById(req.params.id);

        // Sending the data to ejs file
        let tableData = {
            header : file.arrayFile[0],
            data: file.arrayFile,
            file: file
        }

        // Showing data on front end
        return res.render('showFile', {
            title: "File",
            tableData: tableData
        })
    } catch (err) {
        console.log("Error in showing the file", err);
        return res.redirect('back');
    }
}