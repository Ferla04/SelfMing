let db = require('../db/mysql');
const bcrypt = require('bcryptjs');

let registroadmin = async (req, res) => {

    const connection = db.connection()

    const nombre = req.body.nombre;
    const usuario = req.body.usuario;
    const correo = req.body.correo;
    const celular = req.body.celular;
    const password = req.body.password;
    const portafolio = req.body.portafolio;
    const rango = req.body.rango;
    const especialidad = req.body.especialidad;
    const descripcion = req.body.descripcion;
    let hashPass = bcrypt.hashSync(password, 8);
    let spleep = await db.sleepTime(2000);
    
    db.registroadmin(connection,correo,nombre,usuario,celular,hashPass,descripcion,rango,portafolio,especialidad).then(resolve =>{
        res.status(200).json({
            "Status": "ok registrado", 
            "reg": true, 
            "nombre": nombre,
            "usuario": usuario,
            "correo": correo,
            "celular": celular,
            "password": password,
            "portafolio": portafolio,
            "rango": rango,
            "especialidad": especialidad,
            "descripcion": descripcion
        })
        connection.end();
    }).catch(err =>{
        console.log(err);
    })
}
  
module.exports = {
    registroadmin
}