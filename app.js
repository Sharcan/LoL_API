require('./config/config');
require('./config/mongo');
require('./config/passportConfig');

// Initialisation du serveur
const express = require('express');
const app = require('express')();
const server = require('http').createServer(app);

// Initialisation des variables
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const passport = require('passport');

// Initialisation des routes
const accountRouter = require('./routes/account.routes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(cors());

app.use('/api', accountRouter);

// Appel des routes
// Lancement du serveur
server.listen(process.env.PORT || '3000', () => {
    console.log('Server started at PORT ' + process.env.PORT);
});

