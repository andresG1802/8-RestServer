const{Router} = require('express');


const {check} = require('express-validator');
const { cargarArchivo, actualizarPut, actualizarImagen } = require('../controllers/uploadsController');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos } = require('../middlewares');


const router = new Router();

router.post('/',cargarArchivo);
router.put('/:coleccion/:id',[
    check('id','El id debe de ser ').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagen);


module.exports = router;