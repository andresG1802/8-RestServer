const validaCampos = require('./validar-campos');
const validaJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');


module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles
}