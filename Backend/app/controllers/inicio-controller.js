let db = require('../model/mysql');

let bringAdmin = (req, res) => {

    const connection = db.connection();

    db.bringAdmin(connection).then(resolve =>{

        return res.status(200).json(resolve);

        }).catch(err =>{
            console.log(err);
        })
        connection.end();

}

module.exports = {
    bringAdmin
}