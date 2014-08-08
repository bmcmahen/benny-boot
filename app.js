/**
 * Module dependencies
 */

var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var swig = require('swig');
var morgan = require('morgan');
var npath = require('path');
var http = require('http');

/**
 * Relative dependencies
 */

require('./lib/auth');


// Create our app
var app = express();

// app config
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', npath.join(__dirname + '/lib/templates'));

// app middleware
app.use(morgan('short'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', require('./lib/routes/app'));
app.use('/auth', require('./lib/routes/auth'));

// start server
app.listen(3000);