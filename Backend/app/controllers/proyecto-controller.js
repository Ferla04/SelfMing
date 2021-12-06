const db = require('../model/mysql')

let proyecto = (req, res) => {

  const connection = db.connection();

  const nombre = req.body.nombre;
  const prog = req.body.prog;
  const user = req.body.user;
  const fecha = req.body.fecha;
  const descripcion = req.body.descripcion;
  const archivo = req.body.archivo;

  db.proyecto(connection,nombre,fecha,descripcion,prog,user,archivo).then(resolve =>{
    return res.status(200).json({"status": "Proyecto Creado"});
    }).catch(err =>{
        console.log(err);
    })
    connection.end();


}


module.exports = {
  proyecto
}