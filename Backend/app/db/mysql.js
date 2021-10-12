var mysql = require('mysql');
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
function login(c, correo, tabla){
    return new Promise((resolve,reject) =>{
        c.query(`SELECT correo, password FROM ${tabla} WHERE correo=?`, [correo],
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
        c.query('INSERT INTO registrouser SET ?', {correo:correo, nomcompleto:nombre, nomuser:usuario, celular:celular, password:hashPass},
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
        c.query('INSERT INTO registroprog SET ?', {correo:correo, nomcompleto:nombre, nomprog:usuario, celular:celular, password:hashPass, descripcion:descripcion, rango:rango, urlprog:urlprog, especialidad:especialidad},
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
    sleepTime
}