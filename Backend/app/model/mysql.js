let mysql = require('mysql');
let CREDENTIALS = require('../config/mysql');

function connection(){
    const connection = mysql.createConnection(CREDENTIALS);
    connection.connect((err) => {
        if(err) throw err;
        console.log('Connectado a la base de datos!');
    });
    return connection;
}


//LOGIN
function login(c, correo, tabla, id){
    return new Promise((resolve,reject) =>{
        c.query(`SELECT ${id}, correo, password, estado FROM ${tabla} WHERE correo=?`, [correo],
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results)
        })
    })
}

//REGISTRO USUARIO
function registrouser(c, correo,nombre,celular,hashPass){
    return new Promise((resolve, reject) =>{
        c.query('INSERT INTO registrouser SET ?', {correo:correo, nomcompleto:nombre, celular:celular, password:hashPass, estado:'I',perfil:'N'},
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results)
        })
    })
}

//REGISTRO PROGRAMADOR
function registroadmin(c, correo,nombre,celular,hashPass,descripcion,rango,urlprog,especialidad){
    return new Promise((resolve, reject) =>{
        c.query('INSERT INTO registroprog SET ?', {correo:correo, nomcompleto:nombre, celular:celular, password:hashPass, descripcion:descripcion, rango:rango, urlprog:urlprog, especialidad:especialidad, estado:'I', portada:'N', perfil:'N'},
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results)
        })
    })
}

//PAGOS
function pagos(c, nomproyecto,programador,usuario,fecha,valorp){
    return new Promise((resolve, reject) =>{
        c.query('INSERT INTO pagos SET ?', {nomproyecto:nomproyecto, programador:programador, usuario:usuario, fecha:fecha, valorp:valorp},
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results)
        })
    })
}

//PROYECTO
function proyecto(c, nombre,fecha,descripcion,prog,user,archivo){
    return new Promise((resolve, reject) =>{
        c.query('INSERT INTO proyecto SET ?', {nomproyecto:nombre, fecentrega:fecha, descripcion:descripcion, estado:'N', programador:prog, usuario:user, archivo:archivo},
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}

function searchMail(c, correo){
    return new Promise((resolve,reject) =>{
        c.query(`SELECT correo FROM registrouser WHERE correo=?`, [correo],
        (err, results) => {
            if(err){
                return reject(err);
            }else if(results.length > 0){
                return resolve([results,'registrouser'])
            }
        })

        c.query(`SELECT correo FROM registroprog WHERE correo=?`, [correo],
        (err, results) => {
            if(results.length > 0){
                return resolve([results,'registroprog'])
            }else if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}

//correo Activo
function changetoActive(c,correo,tabla){
    return new Promise((resolve, reject) =>{
        c.query(`UPDATE ${tabla} SET estado = 'A' WHERE correo = '${correo}'`,
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results)
        })
    })
}

function bringAdmin(c){
    return new Promise((resolve,reject) =>{
        c.query('SELECT idprog, correo, nomcompleto, celular, descripcion, rango, urlprog, portada, perfil FROM registroprog' ,
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results)
        })
    })
}

function selectedAdmin(c, idprog){
    return new Promise((resolve,reject) =>{
        c.query('SELECT idprog, correo, nomcompleto, celular, descripcion, especialidad, rango, urlprog, portada, perfil FROM registroprog WHERE idprog = ?', [idprog],
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results)
        })
    })
}

function updateAdmin(c,id,correo,descripcion,urlprog,rango,especialidad,portada,perfil){
    return new Promise((resolve,reject) =>{
        c.query(`UPDATE registroprog SET ?
        WHERE idprog=${id}`,{correo:correo, descripcion:descripcion, rango:rango, urlprog:urlprog, especialidad:especialidad, portada:portada, perfil:perfil},
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results)
        })
    })
}


function selectedUser(c, iduser){
    return new Promise((resolve,reject) =>{
        c.query('SELECT idusuario, correo, nomcompleto, celular, perfil FROM registrouser WHERE idusuario = ?', [iduser],
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results)
        })
    })
}


function updateUser(c,id,correo,nombre,celular,perfil){
    return new Promise((resolve,reject) =>{
        c.query(`UPDATE registrouser SET ?
        WHERE idusuario=${id}`,{correo:correo, nomcompleto:nombre, celular:celular, perfil:perfil},
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results)
        })
    })
}


function newPortafolio(c,id,nombre,url){
    return new Promise((resolve,reject) =>{
        c.query(`INSERT INTO portafolio SET ?`,{idprog:id, nombre:nombre, url:url},
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.insertId);
        })
    })
}


function portafolioImage(c,id,url){
    return new Promise((resolve,reject) =>{
        c.query(`INSERT INTO imagenes SET ?`,{idportafolio:id, urlimagen:url},
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.insertId);
        })
    })
}

function bringPortafolio(c, idprog){
    return new Promise((resolve,reject) =>{
        c.query('SELECT * from portafolio WHERE idprog = ?', [idprog],
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}

function bringImages(c,idporta){
    return new Promise((resolve,reject) =>{
        c.query(`SELECT urlimagen from imagenes WHERE idportafolio = ?`,[idporta],
        (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}


function bringProjects(c,id, nombre){
    return new Promise((resolve,reject) =>{
        c.query(`SELECT ru.nomcompleto as nomuser, p.*, rp.nomcompleto as nomprog
        FROM proyecto p inner join registroprog rp on p.programador=rp.idprog 
        inner join registrouser ru on p.usuario=ru.idusuario
        WHERE p.${nombre}= ?`,[id],
        (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}


function selectProjects(c,idprog,iduser){
    return new Promise((resolve,reject) =>{
        c.query(`SELECT rp.correo as programadorC, ru.correo as usuarioC, p.* FROM proyecto p inner join registroprog rp on p.programador=rp.idprog
        inner join registrouser ru on p.usuario=ru.idusuario WHERE p.usuario=? and p.programador=?`,
        [iduser,idprog],
        (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}


function updateStatusPrice(c,idproyecto, estado, valor,resp){
    return new Promise((resolve,reject) =>{
        c.query(`UPDATE proyecto SET estado="${estado}", valor=${valor}, respuesta='${resp}' WHERE idproyecto=${idproyecto}`,
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results)
        })
    })
}

//Tiempo de espera
function sleepTime(time) {
    return new Promise((resolve, reject)=>{
      setTimeout(resolve, time)
    })
    
}


module.exports = {
    connection,
    login,
    registrouser,
    registroadmin,
    pagos,
    proyecto,
    searchMail,
    changetoActive,
    bringAdmin,
    updateAdmin,
    updateUser,
    selectedAdmin,
    selectedUser,
    newPortafolio,
    portafolioImage,
    bringPortafolio,
    bringImages,
    bringProjects,
    selectProjects,
    updateStatusPrice,
    sleepTime,
}