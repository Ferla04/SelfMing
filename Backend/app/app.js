const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const auth = require('./routes/auth'); 
const registrouser = require('./routes/registrouser');
const registroadmin = require('./routes/registroadmin')
const pagos = require('./routes/pagos');
const proyecto = require('./routes/proyecto');
const email = require('./routes/email');
const verificartoken = require('./routes/verificartoken');
const inicio = require('./routes/inicio');
const subirimagen = require('./routes/subirimagen');
const actualizaradmin = require('./routes/actualizaradmin');
const actualizaruser = require('./routes/actualizaruser');
const downloadimage = require('./routes/downloadimage');
const traerprog = require('./routes/traerprog');
const traeruser = require('./routes/traeruser')
const nuevoportafolio = require('./routes/nuevoportafolio');
const imagenesportafolio = require('./routes/imagenesportafolio');
const traerporta = require('./routes/traerporta');
const adjuntarArchivo = require('./routes/adjuntarArchivo');
const traerproyecto = require('./routes/traerproyecto')

const app = express()
  .use(cors({credentials: true, origin: 'http://localhost:4200'}))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .use(cookieParser())
  .use(bearerToken())
  .use(fileUpload());

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
app.use(`${baseApi}/subirimagen`, subirimagen);
app.use(`${baseApi}/actualizaradmin`, actualizaradmin);
app.use(`${baseApi}/actualizaruser`, actualizaruser);
app.use(`${baseApi}/downloadimage`, downloadimage);
app.use(`${baseApi}/traeruser`, traeruser);
app.use(`${baseApi}/nuevoportafolio`, nuevoportafolio);
app.use(`${baseApi}/imagenesportafolio`,imagenesportafolio);
app.use(`${baseApi}/traerporta`,traerporta);
app.use(`${baseApi}/adjuntarArchivo`,adjuntarArchivo);
app.use(`${baseApi}/traerproyecto`,traerproyecto);





module.exports = app;
