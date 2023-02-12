const{Router} = require('express');

const {check} = require('express-validator');
const { crearProducto, putProducto, deleteProducto, getIdProducto, getProducto } = require('../controllers/productosController');
const {  existeCategoria, existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { validarJWT, esAdminRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();


router.get('/',[validarJWT],getProducto);

router.get('/:id',[
    validarJWT,
    check('id','El id ingresado es incorrecto').custom(existeProductoPorId),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],getIdProducto);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto);

router.put('/:id',[
    validarJWT,
    //check('categoria','No es un id de Mongo').isMongoId,
    check('id','No es un id validado').custom(existeProductoPorId),
    validarCampos
],putProducto);

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    check('id','No es un id de Mongo valido').isMongoId(),
    check('id','El id del producto no es valido').custom(existeProductoPorId),
    validarCampos
],deleteProducto)

module.exports = router