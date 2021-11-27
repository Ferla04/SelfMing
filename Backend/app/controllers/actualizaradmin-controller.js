let db = require('../model/mysql');

let actualizaradmin = async (req, res) => {

    const connection = db.connection();

    const descripcion = req.body.descripcion;
    const correo = req.body.correo;
    const urlprog = req.body.urlprog;
    const rango = req.body.rango;
    const especialidad = req.body.especialidad;
    const portada = req.body.portada;
    const perfil = req.body.perfil
    
    console.log(req.body);
    
    // function register(){
    //     db.registroadmin(connection,correo,nombre,celular,hashPass,descripcion,rango,portafolio,especialidad).then(resolve =>{

    //         connection.end();
    //     }).catch(err =>{
    //         console.log(err);
    //     })
    // }

    // res.status(200).json(
    //     {"Status": "ok registrado", 
    //     "reg": true,
    //     "nombre": nombre,
    //     "correo": correo,
    //     "celular": celular,
    //     "password": password,
    //     "portafolio": portafolio,
    //     "rango": rango,
    //     "especialidad": especialidad,
    //     "descripcion": descripcion})
    res.status(200).json(
        {"Status": "holaaaa"})
    
}
  
module.exports = {
    actualizaradmin
}