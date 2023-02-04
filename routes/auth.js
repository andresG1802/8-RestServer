const { Router } = require('express');

const { check}  = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-vampos');


const router = new Router();

router.post('/login',[
    //Ten cuidado con los espacios en los strings
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login);

module.exports = router;
