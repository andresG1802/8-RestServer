const{Router} = require('express');

const {check} = require('express-validator');
const { crearProducto, putProducto, deleteProducto, getIdProducto, getProducto } = require('../controllers/productosController');
const {  existeProducto, existeCategoria, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();


router.get('/',[validarJWT],getProducto);
router.get('/:id',[
    validarJWT,
    check('id','El id ingresado es incorrecto').custom(existeProducto),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],getIdProducto);
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
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