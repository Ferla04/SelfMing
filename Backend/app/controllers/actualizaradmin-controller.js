let db = require('../model/mysql');

let actualizaradmin = async (req, res) => {

    const connection = db.connection();

    const id = req.body.id;
    const descripcion = req.body.descripcion;
    const correo = req.body.correo;
    const urlprog = req.body.urlprog;
    const rango = req.body.rango;
    const especialidad = req.body.especialidad;
    const portada = req.body.portada;
    const perfil = req.body.perfil 

    db.updateAdmin(connection,id,correo,descripcion,urlprog,rango,especialidad,portada,perfil).then(resolve => {
        connection.end();
        return res.status(200).json({
            "Status": "ok registrado", 
            "reg": true,
            "correo": correo,
            "rango": rango,
            "especialidad": especialidad,
            "descripcion": descripcion
        })
    }).catch(err =>{
        console.log(err);
    })
    
}
  
module.exports = {
    actualizaradmin
}