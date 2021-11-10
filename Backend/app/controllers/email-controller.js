let db = require('../model/mysql');

let confirmEmail = (req, res) => {

    const connection = db.connection();
    const email = req.query.email;

    db.searchMail(connection,email).then(resolve =>{
        if(resolve.length > 0){
            return db.changetoActive(connection,email,resolve[1]).then(resolve2=>{
                console.log('realizado');
                res.redirect(`http://localhost:4200/cEmail`)
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