let db = require('../model/mysql');

let uploadImgPortafolio = (req, res) => {
	
	for (const i of req['files'].files) {
		i.mv(`./images/portafolio/${i.name}.png`, function(err) {
			console.log(err);
    	});
  	}

	const connection = db.connection();
	const idporta = req.query.idportafolio;
	let nomImage;


	for (const i of req['files'].files) {
		nomImage = i.name;
		db.portafolioImage(connection,idporta,nomImage).then(resolve =>{
	
		}).catch(err =>{
			console.log(err);
		})
  	}

	res.status(201).json({"Status": "upload ok"})
    connection.end();
          
}
  
  
module.exports = {
  uploadImgPortafolio
}
