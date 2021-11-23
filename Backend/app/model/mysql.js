let mysql = require('mysql');
let CREDENTIALS = require('../config/mysql');

function connection(){
    const connection = mysql.createConnection(CREDENTIALS);
    connection.connect((err) => {
        if(err) throw err;
        console.log('Connectado a la base de datos!');
    });
    return connection;
}


//LOGIN
function login(c, correo, tabla, id){
    return new Promise((resolve,reject) =>{
        c.query(`SELECT ${id}, correo, password, estado FROM ${tabla} WHERE correo=?`, [correo],
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results)
        })
    })
}

//REGISTRO USUARIO
function registrouser(c, correo,nombre,usuario,celular,hashPass){
    return new Promise((resolve, reject) =>{
        c.query('INSERT INTO registrouser SET ?', {correo:correo, nomcompleto:nombre, nomuser:usuario, celular:celular, password:hashPass, estado:'I'},
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results)
        })
    })
}

//REGISTRO PROGRAMADOR
function registroadmin(c, correo,nombre,usuario,celular,hashPass,descripcion,rango,urlprog,especialidad){
    return new Promise((resolve, reject) =>{
        c.query('INSERT INTO registroprog SET ?', {correo:correo, nomcompleto:nombre, nomprog:usuario, celular:celular, password:hashPass, descripcion:descripcion, rango:rango, urlprog:urlprog, especialidad:especialidad, estado:'I'},
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results)
        })
    })
}

//PAGOS
function pagos(c, nomproyecto,programador,usuario,fecha,valorp){
    return new Promise((resolve, reject) =>{
        c.query('INSERT INTO pagos SET ?', {nomproyecto:nomproyecto, programador:programador, usuario:usuario, fecha:fecha, valorp:valorp},
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results)
        })
    })
}

//PROYECTO
function proyecto(c, nomproyecto,fecha,descripcion,estado,programador,usuario){
    return new Promise((resolve, reject) =>{
        c.query('INSERT INTO proyecto SET ?', {nomproyecto:nomproyecto, fecentrega:fecha, descripcion:descripcion, estado:estado, programador:programador, usuario:usuario},
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results)
        })
    })
}

function searchMail(c, correo){
    return new Promise((resolve,reject) =>{
        c.query(`SELECT correo FROM registrouser WHERE correo=?`, [correo],
        (err, results) => {
            if(err){
                return reject(err);
            }else if(results.length > 0){
                return resolve([results,'registrouser'])
            }
        })

        c.query(`SELECT correo FROM registroprog WHERE correo=?`, [correo],
        (err, results) => {
            if(results.length > 0){
                return resolve([results,'registroprog'])
            }else if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}

//correo Activo
function changetoActive(c,correo,tabla){
    return new Promise((resolve, reject) =>{
        c.query(`UPDATE ${tabla} SET estado = 'A' WHERE correo = '${correo}'`,
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results)
        })
    })
}

function bringAdmin(c){
    return new Promise((resolve,reject) =>{
        c.query('SELECT idprog, correo, nomcompleto, nomprog, celular, descripcion, rango, urlprog FROM registroprog' ,
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results)
        })
    })
}

function selectedAdmin(c, idprog){
    return new Promise((resolve,reject) =>{
        c.query('SELECT idprog, correo, nomcompleto, nomprog, celular, descripcion, especialidad, rango, urlprog FROM registroprog WHERE idprog = ?', [idprog],
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results)
        })
    })
}


//Tiempo de espera
function sleepTime(time) {
    return new Promise((resolve, reject)=>{
      setTimeout(resolve, time)
    })
    
}


module.exports = {
    connection,
    login,
    registrouser,
    registroadmin,
    pagos,
    proyecto,
    searchMail,
    changetoActive,
    sleepTime,
    bringAdmin,
    selectedAdmin
}