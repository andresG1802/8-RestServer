const{Router} = require('express');


const {check} = require('express-validator');
const { cargarArchivo, actualizarPut, actualizarImagen, mostrarImagenes, actualizarImagenCloudinary } = require('../controllers/uploadsController');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos,validarArchivoSubir } = require('../middlewares');


const router = new Router();

router.post('/',validarArchivoSubir,cargarArchivo);
router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El id debe de ser ').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagenCloudinary);
router.get('/:coleccion/:id',[
    check('id','El id debe de ser ').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagenes)

module.exports = router;