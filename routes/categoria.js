const{Router} = require('express');


const {check} = require('express-validator');
const { crearCategoria,getCategoria, deleteCategoria, putCategoria, getIdCategoria} = require('../controllers/categoriasController');
const { validarJWT } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-vampos');

const router = new Router();


router.get('/',[validarJWT],getCategoria);

router.get('/buscar',[
    validarJWT,
    check('id','El id ingresado es incorreto').isMongoId(),
    validarCampos
],getIdCategoria);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);
router.put('/',[
    check('id','No es un id validado').isMongoId(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],putCategoria);

router.delete('/',[
    validarJWT,
    check('id','El id de la categoria no es valido').isMongoId(),
    validarCampos
],deleteCategoria);



module.exports = router