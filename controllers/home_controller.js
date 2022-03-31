const Upload = require('../models/multer');

module.exports.home = async function(req, res){
    return res.render('home',{
        title: "Home"
    });
}

module.exports.upload = function(req, res){
    // console.log(req.file);
    return res.render('home',{
        title: "Home"
    });
}