const{Router} = require('express');

const {check} = require('express-validator');
const { crearProducto, putProducto, deleteProducto, getIdProducto } = require('../controllers/productosController');
const { existeCategoria, existeProducto } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();


router.get('/');
router.get('/:id',[
    validarJWT,
    check('id','El id ingresado es incorrecto').custom(existeProducto),
    validarCampos
],getIdProducto)
router.post('/'[
    validarJWT,
    check('nombre','El nombre es obligatorio').not.isEmpty(),
    validarCampos
],crearProducto);

router.put('/:id',[
    validarJWT,
    check('id','No es un id validado').custom(existeProducto),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],putProducto);

router.delete('/',[
    validarJWT,
    check('id','El id del producto no es valido').custom(existeProducto),
    validarCampos
],deleteProducto)

module.exports = router