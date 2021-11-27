let imagen = (req, res) => {
        let img = req.query.imagen;
        console.log(img);
        return res.download(img+".png");    
      }


module.exports = {
  imagen
}