var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'DMC' });
});

module.exports = router;



router.post('/', async (req, res, next) => {

  console.log(req.body)
  
  var nombre = req.body.nombre;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'info@distribuidoradmc.com.ar',
    subject: 'Contacto desde la Web',
    html: nombre + " se contacto y quiere mas info a este correo : " + email + ". <br> Y realizo el siguiente comentario: " + mensaje + ". <br> Su Telefono es: " + telefono
  }

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
   
  var info = await transporter.sendMail(obj);

  res.render('index', {
    isindex: true,
    message: 'Mensaje Enviado correctamente'
    
  });

});