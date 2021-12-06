let imagen = (req, res) => {
    let img = req.query.imagen;
    return res.download(img+".png");    
}

module.exports = {
  imagen
}