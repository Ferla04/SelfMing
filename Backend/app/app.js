const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const cookieParser = require('cookie-parser');

const auth = require('./routes/auth'); 
const registrouser = require('./routes/registrouser');
const registroadmin = require('./routes/registroadmin')
const pagos = require('./routes/pagos');
const proyecto = require('./routes/proyecto');
const email = require('./routes/email');
const verificartoken = require('./routes/verificartoken');
const inicio = require('./routes/inicio')
const traerprog = require('./routes/traerprog')

const app = express()
  .use(cors({credentials: true, origin: 'http://localhost:4200'}))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .use(cookieParser())
  .use(bearerToken());

const baseApi = '/api/v01'

app.use(`${baseApi}/login`, auth);
app.use(`${baseApi}/registrouser`, registrouser);
app.use(`${baseApi}/registroprog`, registroadmin);
app.use(`${baseApi}/pagos`, pagos);
app.use(`${baseApi}/proyecto`, proyecto);
app.use(`${baseApi}/verificartoken`, verificartoken);
app.use(`${baseApi}/cEmail`, email);
app.use(`${baseApi}/inicio`, inicio);
app.use(`${baseApi}/traerprog`, traerprog);

module.exports = app;
