let db = require('../model/mysql');
let mail = require('../helpers/sendMail');
const bcrypt = require('bcryptjs');

let registrouser = async (req, res) => {

    const connection = db.connection()

    const nombre= req.body.nombre; 
    const correo= req.body.correo;
    const celular= req.body.celular;
    const password= req.body.password;
    let hashPass = bcrypt.hashSync(password, 8);
    let spleep = await db.sleepTime(2000);

    //Email
    db.searchMail(connection, correo).then( resolve => {
        if(resolve.length == 0){
            return register();
        }
        connection.end();
        return res.status(200).json({
            "status": "correo ya existente", 
        })
    }).catch(err => {
        console.log(err);
    })

    function register(){
        db.registrouser(connection,correo,nombre,celular,hashPass).then(resolve =>{
            res.status(200).json({
                "Status": "ok registrado", 
                "reg": true, 
                "correo": correo,
                "nombre": nombre,
                "celular": celular,
                "password":password
            })
            mail.sendEmail('gmail',correo,'selfming264@gmail.com','gwtnwclwdfrbtzfw');
            connection.end();
        }).catch(err =>{
            console.log(err);
        })
    }
  
}
  
module.exports = {
registrouser
}