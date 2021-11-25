let upload = (req, res) => {
    let id = req.query.id;
    
    req['files'].files.forEach((element, index )=> {
      element.mv(`./images/${element.name}.png`, function(err) {
        console.log(err);
      });
    });
    console.log(req['files']);

    // req['files'].files.mv(`./images/${id}.png`, function(err) {
    //   console.log(err);
    // });
    console.log(req['files']);
    return res.status(201).json({"Status": "upload ok"}); 
}
  
  
module.exports = {
    upload
}
