let db = require('../module/mysql');
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

    //Email
    db.searchMail(connection, correo).then( resolve => {
        if(resolve.length == 0){
            return register();
        }
        connection.end();
        return res.status(200).json({
            "Status": "correo ya existente", 
        })
    }).catch(err => {
        console.log(err);
    })

    function register(){
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
            db.sendEmail(correo);
            connection.end();
        }).catch(err =>{
            console.log(err);
        })
    }
  
}
  
module.exports = {
registrouser
}