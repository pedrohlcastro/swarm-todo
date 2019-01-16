const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compress = require('compression');
const mongoose = require('mongoose');


const ENV = process.env.NODE_ENV;
const app = express();

require('./config/configDb')(mongoose);

app.use(compress());
app.use(morgan(ENV || 'dev'));
app.use(cors());

//helmet config
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
app.use(helmet.xssFilter());
app.disable('x-powered-by');


//body-parser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', require('./routes/toDoRoutes')(new express.Router()));

//Error handler
app.use((err, req, res, next) => {
    if(err.err) {
        console.error('\x1b[31m', '[SERVER] ' + err.err);
        res.status(err.status || 500).json({result: err.msg});
    }
    next();
});

module.exports = app;