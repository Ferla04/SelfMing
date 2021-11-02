const nodemailer = require('nodemailer');
const path = require('path');


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
        `,
        // attachments: [{
        //     filename: 'hola.txt', 
        //     path: path.join(__dirname, './hola.txt'),
        //     contentType: 'application/txt'
        // }],
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
    sendEmail
}