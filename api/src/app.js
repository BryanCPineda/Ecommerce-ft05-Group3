const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors');
const passport = require('passport');                   //se importa passport para autenticacion con gitHub
const session = require("express-session");             //se importa session para el manejo de sesiones con passport
require('./routes/gitHub-Passport-setup');              //se importa para toda la app, la estructura de passport con gitHub
require('./routes/twitter-config');                     //se importa para toda la app, la estructura de passport con twitter

require('./db.js');


const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(
  cors({
    origin: "http://localhost:3000",                    //se habilitan las credenciales de cors para los pedidos que vengan del front
    credentials: true,
  })
)

server.use(                                             //se habilita el manejo de sesiones para el server
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);


server.use(passport.initialize());                    //se inicializa passport y passport session para el manejo de la session con passport
server.use(passport.session());

// server.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
