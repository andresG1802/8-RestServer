const{Router} = require('express');


const {check} = require('express-validator');
const { crearCategoria,getCategoria, deleteCategoria, putCategoria, getIdCategoria} = require('../controllers/categoriasController');
const { existeCategoria } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();


router.get('/',[validarJWT],getCategoria);

router.get('/:id',[
    validarJWT,
    check('id','El id ingresado es incorreto').custom(existeCategoria),
    validarCampos
],getIdCategoria);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);
router.put('/:id',[
    validarJWT,
    check('id','No es un id validado').custom(existeCategoria),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],putCategoria);

router.delete('/',[
    validarJWT,
    check('id','El id de la categoria no es valido').custom(existeCategoria),
    validarCampos
],deleteCategoria);

module.exports = router