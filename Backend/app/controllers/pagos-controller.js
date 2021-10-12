let db = require('../db/mysql');

let pagos = (req, res) => {

    const connection = db.connection();

    const nomproyecto = req.body.nomproyecto;
    const programador = req.body.programador;
    const usuario = req.body.usuario;
    const fecha = req.body.fecha;
    const valorp = req.body.valorp;

    db.pagos(connection, nomproyecto, programador, usuario, fecha, valorp).then(resolve =>{
        console.log(resolve);
        return res.status(200).json({
            "Status": "ok registrado", 
            "nomproyecto": nomproyecto,
            "programador": programador,
            "usuario": usuario,
            "fecha": fecha,
            "valorp": valorp
            })
        }).catch(err =>{
            console.log(err);
        })
        connection.end();
}

module.exports = {
    pagos
}