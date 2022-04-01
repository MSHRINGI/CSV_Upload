const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const port = 8888;
const app = express();
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(logger(env.morgan.mode, env.morgan.options));
// make the uploads post available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port:: ${port}`);
});