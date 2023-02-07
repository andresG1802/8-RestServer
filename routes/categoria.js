const{Router} = require('express');


const {check} = require('express-validator');
const { crearCategoria } = require('../controllers/categorias');
const { validarJWT } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-vampos');

const router = new Router();
router.get('/',[
    check('')
]);

router.get('/:id',[
    check('')
]);
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);
router.put('/:id',[
    check('')
]);
router.delete('/:id',[
    check('')
]);



module.exports = router