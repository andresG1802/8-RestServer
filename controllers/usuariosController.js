//esto se hace para que reconozca a res 
const {request,response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuarios');


const usuariosGet = (req, res = response) => {
    res.json({
        msg:"get api - controlador"
    });
}
const usuariosPut = (req=request, res=response) => {
    const {q,nombre='No name',apikey,page = 1,limit} = req.query;
    // res.send('Hello World!')
    res.status(500).json({
        msg:"put api - controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    });
}
const usuariosPost = async(req,res=response) =>{
  
    // Esta destructuracion 
    //sirve para los datos que deseas
    const {nombre,correo,password,rol} = req.body;
    
    const usuario = new Usuario({nombre,correo,password,rol});
    

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password,salt);

    //Grabar en DB
    await usuario.save();
    res.json({
        msg:"post api - controlador",
        usuario
    });

}
const usuariosDelete = (req, res) => {
    // res.send('Hello World!')
    res.json({
        msg:"delete api - controlador"
    });
}
const usuariosPatch = (req, res) => {
    // res.send('Hello World!')
    res.json({
        msg:"patch api - controlador"
    });
}
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}