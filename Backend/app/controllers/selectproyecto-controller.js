let db = require('../model/mysql');

let selectproyecto = (req, res) => {

    const connection = db.connection();
    const idprog = req.query.idprog;
    const iduser = req.query.iduser;

    db.selectProjects(connection,idprog,iduser).then(resolve =>{
        return res.status(200).json(resolve);

    }).catch(err =>{
        console.log(err);
    })
    connection.end();
}

module.exports = {
    selectproyecto
}