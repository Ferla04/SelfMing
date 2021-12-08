let db = require('../model/mysql');

let traerporta = (req, res) => {

    const connection = db.connection();
    
    const idprog = req.query.id;
    const resultPorta = [];

    db.bringPortafolio(connection, idprog).then(resolve =>{
        resultPorta.push(resolve);
        resolve.forEach(e => {
            db.bringImages(connection,e.idportafolio).then(resp =>{
                resultPorta.push(resp);
            }).catch(err =>{ 
                console.log(err);
            })
        });
        connection.end();
        setTimeout(()=>{
            return res.status(200).json(resultPorta);
        },300)

    }).catch(err =>{
        console.log(err);
    })
}

module.exports = {
    traerporta
}