let db = require('../db/mysql');
const bcrypt = require('bcryptjs');

let registrouser = async (req, res) => {

    const connection = db.connection()

    const nombre= req.body.nombre; 
    const usuario= req.body.usuario;
    const correo= req.body.correo;
    const celular= req.body.celular;
    const password= req.body.password;
    let hashPass = bcrypt.hashSync(password, 8);
    let spleep = await db.sleepTime(2000);

    db.registrouser(connection,correo,nombre,usuario,celular,hashPass).then(resolve =>{
        res.status(200).json({
            "Status": "ok registrado", 
            "reg": true, 
            "correo": correo,
            "nombre": nombre,
            "usuario": usuario,
            "celular": celular,
            "password":password
        })
        connection.end();
    }).catch(err =>{
        console.log(err);
    })
  
}
  
module.exports = {
registrouser
}