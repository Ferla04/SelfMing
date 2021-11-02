var mysql = require('mysql');
const nodemailer = require('nodemailer');
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
        c.query(`SELECT correo, password, estado FROM ${tabla} WHERE correo=?`, [correo],
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
        c.query(`UPDATE ${tabla} SET estado = 'a' WHERE correo = '${correo}'`,
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

//Enviar Correo
function sendEmail(tipo,destinatario,remitente,contraseña){
    let jConfig;

    if(tipo == 'hotmail'){
        jConfig = jConfigHotmail(remitente,contraseña);
    }else if(tipo == 'gmail'){
        jConfig = jConfigGmail(remitente,contraseña);
    }else{
        return console.log('No existe');
    }

    let email ={ 
        from:`"SelfMing" <${remitente}>`,  //remitente
        to: destinatario,  //destinatario
        subject:"SelfMing Project",  //asunto del correo
        html:`
        <div style="background-color: #1c1321; color: #fff; width: 400px;height: 450px; font-family: Arial, Helvetica, sans-serif;
        text-align: center; margin: auto;">
            <h1 style="padding: 15px 0 0 ;">Bienvenido a SelfMing</h1>
            <img width="200px" src="https://i.postimg.cc/gkLDKKTq/logo.png" alt="">
            <p style="font-size: 18px;">Por favor confirmanos tu correo</p>
            <a
            style="
                font-size: 13px;
                font-weight: 900;
                background-color: #460e56;
                color: #fff;
                text-decoration: none;
                text-transform: uppercase;
                padding: 10px 20px;
                border-radius: 5px;
                border: 2px solid #fff;
                border-bottom: 5px solid #ffc957;
                border-right: 4px solid #ffc957;
                transition: all ease .5s;
            " href="http://localhost:10103/cEmail?email=${destinatario}">Confirmar</a>
            <p style="margin-top: 25px; font-size: 14px;"
            >Creadores: <br> Juan Esteban Reyes Quintero <br> Fernanda Velásquez Medina </p>
        </div>
        `
    };
    
    
    let createTransport = nodemailer.createTransport(jConfig);
    
    createTransport.sendMail(email, function (error, info) { 
        if(error){ 
            console.log("Error al enviar email"); 
            console.log(error);
        } else{ 
             console.log("Correo enviado correctamente"); 
        } 
        createTransport.close(); 
    });
}

function jConfigHotmail(remitente,contraseña){
    return jConfig = {
        host:"smtp-mail.Outlook.com", 
        port: 587, 
        secureConnection: false,
        tls: {
            ciphers:'SSLv3'
        },
        auth:{ 
            user:`${remitente}`, 
            pass:`${contraseña}` 
        },
    };
}


function jConfigGmail(remitente,contraseña){
    return jConfig = {
        host:"smtp.gmail.com", 
        port:465, 
        secure:true,
        auth:{ 
            user:`${remitente}`, 
            pass:`${contraseña}`  
        },
    };
}

module.exports = {
    connection,
    login,
    registrouser,
    registroadmin,
    pagos,
    proyecto,
    sendEmail,
    changetoActive,
    sleepTime
}