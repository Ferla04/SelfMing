let db = require('../model/mysql');

let eliminar = async (req, res) => {

    const connection = db.connection();

    const id = req.query.idproj;
    const tabla = req.query.tabla; 

    if(tabla == 'proyecto'){
        db.deleteProj(connection,id,tabla,'idproyecto').then(resolve => {
            connection.end();
            return res.status(200).json({status: 'eliminado'});
        }).catch(err =>{
            console.log(err);
        })
    }else{
        db.deleteProj(connection,id,tabla,'idportafolio').then(resolve => {
            db.deleteProj(connection,id,'portafolio','idportafolio').then(resolve => {
                connection.end();
                return res.status(200).json({status: 'eliminado'});
            }).catch(err =>{
                console.log(err);
            })
        }).catch(err =>{
            console.log(err);
        })
    }


    
}
  
module.exports = {
    eliminar
}