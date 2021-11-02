const db = require('../model/mysql')
const key = require('../config/key');
const bcrypt = require('bcryptjs');
const nJwt = require('njwt');


let auth = async (req, res) => {

    const connection = db.connection();

    const correo = req.body.correo;
    const password = req.body.password;
    let spleep = await db.sleepTime(2000);

    db.login(connection, correo, 'registrouser').then(resolve =>{
        if(resolve.length == 0){
            
            db.login(connection, correo, 'registroprog').then(resolve =>{
                if(resolve.length == 0 || !bcrypt.compareSync(password, resolve[0].password)){
                    return res.status(401).send({ status: 'Usuario y/o password incorrectas', auth: false});
                }else if(resolve[0].estado == 'A'){
                    let jwt = nJwt.create({ idprog: resolve[0].idprog, rol: 'prog' }, key.SIGNING_KEY);
                    jwt.setExpiration(new Date().getTime() + (2 * 60 * 1000));
                    token = jwt.compact();

                    console.log('soy programador')
                    return res.status(201).send({ status: 'Conexión exitosa', auth: false, token:token});
                }else{
                    return res.status(201).send({ status: 'Cuenta Inactiva'});
                }
                
            }).catch(err =>{
                console.log(err);
            })

        }else if(resolve[0].estado == 'A'){
            if(!bcrypt.compareSync(password, resolve[0].password)){
                return res.status(401).send({ status: 'Usuario y/o password incorrectas', auth: false});
                
            }else{                    
                
                let jwt = nJwt.create({ idusuario: resolve[0].idusuario,  rol: 'user' }, key.SIGNING_KEY);
                jwt.setExpiration(new Date().getTime() + (2 * 60 * 1000));
                token = jwt.compact();
                console.log('soy usuario')
                
                return res.status(201).send({ status: 'Conexión exitosa', auth: false, token:token});
            }

        }else{
            return res.status(201).send({ status: 'Cuenta Inactiva'});
        }
        connection.end()
    }).catch(err =>{
        console.log(err);
    })

    
}

module.exports = {
    auth
}