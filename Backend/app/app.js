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


app.use('/api/v01/login', auth);
app.use('/api/v01/registrouser', registrouser);
app.use('/api/v01/registroprog', registroadmin);
app.use('/api/v01/pagos', pagos);
app.use('/api/v01/proyecto', proyecto);
app.use('/api/v01/verificartoken', verificartoken);
app.use('/api/v01/cEmail', email);
app.use('/api/v01/inicio', inicio);
app.use('/api/v01/traerprog', traerprog);

module.exports = app;
