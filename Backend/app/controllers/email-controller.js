let db = require('../module/mysql');

let confirmEmail = (req, res) => {

    const connection = db.connection();
    const email = req.query.email;

    db.searchMail(connection,email).then(resolve =>{
        if(resolve.length > 0){
            return db.changetoActive(connection,email,resolve[1]).then(resolve2=>{
                console.log('realizado');
                return res.status(200).json({ 
                    "Activo": true, 
                })
            })
        }
        connection.end();
        return res.status(400).json({ 
            "Activo": false, 
        })
    }).catch(err =>{
        console.log(err);
    });
}

module.exports = {
    confirmEmail
}