const File = require('../models/file');

module.exports.showFile = async function (req, res) {
    try {
        let file = await File.findById(req.params.id);
        console.log("this is the complete file" ,file.arrayFile);
        // console.log("length of the first row", file.arrayFile[0].length);
        // console.log("first element", file.arrayFile[0][0]);
        
        let tableData = {
            header : file.arrayFile[0],
            data: file.arrayFile
        }
        return res.render('showFile', {
            title: "File",
            tableData: tableData
        })
    } catch (err) {
        console.log("Error in showing the file", err);
        return res.redirect('back');
    }
}