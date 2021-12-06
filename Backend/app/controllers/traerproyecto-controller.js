let db = require('../model/mysql');

let traerproyecto = (req, res) => {

    const connection = db.connection();
    const id = req.query.id;
    const nomCampo = req.query.campo;

    db.bringProjects(connection,id, nomCampo).then(resolve =>{
        return res.status(200).json(resolve);

    }).catch(err =>{
        console.log(err);
    })
    connection.end();
}

module.exports = {
    traerproyecto
}