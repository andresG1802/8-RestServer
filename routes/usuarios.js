const {Router}  = require('express');
const { check } = require('express-validator');
const Roles = require('../models/roles');
const { validarCampos } = require('../middlewares/validar-vampos');

const { usuariosGet ,
    usuariosPut ,
    usuariosPost, 
    usuariosDelete,
    usuariosPatch} = require('../controllers/usuariosController');
const router = new Router();

router.get('/', usuariosGet);
router.put('/', usuariosPut);
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe de ser más de 6 letras').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('rol').custom(async(rol ='')=>{
        const existeRol = await Roles.findOne({rol});
        if(!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en la BD`)
        }
    }),
    validarCampos
], usuariosPost);
router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);


module.exports = router;