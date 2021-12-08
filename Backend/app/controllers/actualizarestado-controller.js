let db = require('../model/mysql');

let actualizarestado = async (req, res) => {

    const connection = db.connection();

    const idproyecto = req.body.proyecto;
    const estado = req.body.estado;
    const valor = req.body.valor;
    const resp = req.body.resp

    db.updateStatusPrice(connection,idproyecto, estado, valor, resp).then(resolve => {
        connection.end();
        return res.status(200).json({status: 'actualizado'});
    }).catch(err =>{
        console.log(err);
    })
    
}
  
module.exports = {
    actualizarestado
}