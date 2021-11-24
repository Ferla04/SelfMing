let upload = (req, res) => {
    
    let id = req.query.id;
    console.log(id);
    console.log(req.files);
    let file = req['files'].img.mv(`./${id}-${nombre}.png`, function(err) {
      console.log(err);
    });
    console.log(file);
    return res.status(201).json({"Status": "upload ok"}); 
}
  
  
module.exports = {
    upload
}
