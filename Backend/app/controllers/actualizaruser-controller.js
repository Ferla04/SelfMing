let db = require('../model/mysql');

let actualizarUser = async (req, res) => {

    const connection = db.connection();

    const id = req.body.id;
    const correo = req.body.correo;
    const nombre = req.body.nombre;
    const celular = req.body.celular;
    const perfil = req.body.perfil

    db.updateUser(connection,id,correo,nombre,celular,perfil).then(resolve => {
        connection.end();
        return res.status(200).json({
            "Status": "ok registrado", 
            "reg": true,
            "correo": correo,
            "nombre": nombre,
            "perfil":perfil
        })
    }).catch(err =>{
        console.log(err);
    })
    
}
  
module.exports = {
    actualizarUser
}