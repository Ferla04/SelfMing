let imagen = (req, res) => {
    let img = req.query.imagen;
    let type = req.query.type;

    if(type == 'archivo') return res.download(img);
    
    return res.download(img+".png");  

}

module.exports = {
  imagen
}