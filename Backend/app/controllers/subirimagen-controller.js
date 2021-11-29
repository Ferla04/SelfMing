let upload = (req, res) => {

    let rut;

    if(req['files'].files.length > 1){
      req['files'].files.forEach((element )=> {

        let nomImage = element.name.split(',');
        if(nomImage[2] == 'P' && nomImage[0] == 'perfil'){
          rut = './images/perfilprog/';
        }else{
          rut = './images/portadaprog/';
        }

        element.mv(`${rut}${element.name}.png`, function(err) {
          console.log(err);
        });
      });

    }else{
      
      let nomImage = req['files'].files.name.split(',');
      if(nomImage[2] == 'P' && nomImage[0] == 'perfil'){
        rut = './images/perfilprog/';
      }else if(nomImage[2] == 'P' && nomImage[0] == 'portada'){
        rut = './images/portadaprog/';
      }else{
        rut = './images/perfiluser/';
      }

      req['files'].files.mv(`${rut}${req['files'].files.name}.png`, function(err) {
        console.log(err);
      });
    }
    

    return res.status(201).json({"Status": "upload ok"});
}
  
  
module.exports = {
    upload
}
