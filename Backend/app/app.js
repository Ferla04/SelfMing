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

const app = express()
  .use(cors({credentials: true, origin: 'http://localhost:4200'}))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .use(cookieParser())
  .use(bearerToken());


app.use('/login', auth);
app.use('/registrouser', registrouser);
app.use('/registroprog', registroadmin);
app.use('/pagos', pagos);
app.use('/proyecto', proyecto);



module.exports = app;