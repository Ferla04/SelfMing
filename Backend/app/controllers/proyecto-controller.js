const db = require('../db/mysql')

let proyecto = (req, res) => {

  const connection = db.connection();

  const nomproyecto = req.body.nomproyecto;
  const fecentrega = req.body.fecentrega;
  const descripcion = req.body.descripcion;
  const estado = req.body.estado;
  const usuario = req.body.usuario;
  const programador = req.body.programador;

  db.proyecto(connection, nomproyecto, fecentrega, descripcion, estado, programador, usuario).then(resolve =>{
    console.log(resolve);
    return res.status(200).json({
        "Status": "ok registrado", 
        "nomproyecto": nomproyecto,
        "fecentrega": fecentrega,
        "descripcion": descripcion,
        "estado": estado,
        "usuario": usuario,
        "programador": programador
        })
    }).catch(err =>{
        console.log(err);
    })
    connection.end();


}


module.exports = {
  proyecto
}