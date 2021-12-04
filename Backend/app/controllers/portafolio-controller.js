let db = require('../model/mysql');

let nuevoportafolio = async (req, res) => {

    const connection = db.connection();

    const id = req.body.id;
    const nombre = req.body.nombre;
    const url = req.body.url;

    db.newPortafolio(connection,id,nombre,url).then(resolve => {
        connection.end();
        return res.status(200).json({ 
            "idportafolio": resolve
        })
    }).catch(err =>{
        console.log(err);
    })
    
}
  
module.exports = {
    nuevoportafolio
}