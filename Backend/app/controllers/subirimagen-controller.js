let upload = (req, res) => {
    let id = req.query.id;
    
    if(req['files'].files.length > 1){
      req['files'].files.forEach((element, index )=> {
        element.mv(`./images/${element.name}.png`, function(err) {
          console.log(err);
        });
      });
    }else{
      req['files'].files.mv(`./images/${req['files'].files.name}.png`, function(err) {
        console.log(err);
      });
    }
    
    console.log(req['files']);

    console.log(req['files']);
    return res.status(201).json({"Status": "upload ok"});
}
  
  
module.exports = {
    upload
}
