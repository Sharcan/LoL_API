require('./config/mongo');

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

// Initialisation des routes
var indexRouter = require('./routes/index');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Appel des routes
app.use('/', indexRouter)

// Lancement du serveur
server.listen(process.env.PORT || '3000', () => {
    console.log('Server started at PORT 3000');
});

