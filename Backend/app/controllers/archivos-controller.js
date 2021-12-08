let uploadfile = (req, res) => {

  req['files'].files.mv(`./files/${req['files'].files.name}`, function(err) {
    console.log(err);
  });
          
  res.status(201).json({"Status": "upload ok"})
}
 
module.exports = {
  uploadfile
}