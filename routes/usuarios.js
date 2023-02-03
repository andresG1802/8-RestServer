const {Router}  = require('express');
const { check } = require('express-validator');
const Roles = require('../models/roles');
const { validarCampos } = require('../middlewares/validar-vampos');

const { usuariosGet ,
    usuariosPut ,
    usuariosPost, 
    usuariosDelete,
    usuariosPatch} = require('../controllers/usuariosController');
const { esRoleValido, emailExiste } = require('../helpers/db-validators');
const router = new Router();

router.get('/', usuariosGet);
router.put('/', usuariosPut);
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe de ser más de 6 letras').isLength({min:6}),
    check('correo','El correo no es valido').custom(emailExiste),
    //Se puede obviar la forma en como esta escrita
    //ya que el parametro rol ya esta siendo pasado en check
    //check('rol').custom(rol=>esRoleValido(rol)),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);
router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);


module.exports = router;