let db = require('../model/mysql');

let traerAdmin = (req, res) => {

    const connection = db.connection();
    const idprog = req.query.id;

    db.selectedAdmin(connection, idprog).then(resolve =>{
        // Enviar API de los programadores
        return res.status(200).json(resolve);

    }).catch(err =>{
        console.log(err);
    })
    connection.end();
}

module.exports = {
    traerAdmin
}