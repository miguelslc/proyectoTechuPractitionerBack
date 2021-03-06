//require('./config/cfg');
require('./config/database');
require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const errorhandler = require('errorhandler');
const logger = require('morgan');


const isProduction = process.env.NODE_ENV === 'production';

// Create global app object
const app = express();

app.use(cors());

const bodyParser = require('body-parser');
const { static } = require('express');

// Normal express config defaults
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

if (!isProduction) {
    app.use(errorhandler());
}

app.use(logger('dev'));

mongoose.connect(process.env.URLDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
    (err, res) => {
    
    if (err) throw err;
    console.log('MongoDB is ONLINE ');
});

require('./api/models/Users');
require('./api/models/Movimentos');
require('./api/models/Account');
require('./config/passport');


// Configuración global de rutas
app.use(require('./routes/'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
if (!isProduction) {
    // development error handler
    // will print stacktrace
    app.use(function(err, req, res, next) {
        console.log(err.stack);

        res.status(err.status || 500);

        res.json({'errors': {
        message: err.message,
        error: err
        }});
    });
}else {
    // production error handler
    // no stacktraces leaked to user
    app.use ('/', express.static(`${__dirname}/`))
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({'errors': {
            message: err.message,
            error: {}
        }});
    });
}

// finally, let's start our server...
var server = app.listen( process.env.PORT || 5000, function(){
    console.log('Server is listening on port ' + server.address().port);
});