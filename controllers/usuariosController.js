//esto se hace para que reconozca a res 
const {request,response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuarios');


const usuariosGet = async(req, res = response) => {
    
    //request es el url
    const {limite = 5,desde = 0} = req.query
    const query = {estado: true};
    
    // const usuarios = await Usuario.find(query)
    // .skip(Number(desde))
    // .limit(Number(limite));
    
    // const total = await Usuario.countDocuments(query);
     
    // El promise me permite mandar un arreglo
    // con todas las promesas que quieres que se ejecuten
    
    //total = posicion 0 del arreglo , usuarios posicion 1 del arreglo
    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}
const usuariosPut = async(req=request, res=response) => {
    // const {q,nombre='No name',apikey,page = 1,limit} = req.query;
    // // res.send('Hello World!')
    // res.status(500).json({
    //     msg:"put api - controlador",
    //     q,
    //     nombre,
    //     apikey,
    //     page,
    //     limit
    // });
    const { id } = req.params;
    const {_id,password,google,correo,...resto} = req.body;

    //TODO validar contra base de datos

    if(password )
    {
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password,salt); 
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        msg:'put API - usuariosPut',
        usuario
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
const usuariosDelete = async(req, res) => {
    
    const { id } = req.params;

    const uid = req.uid;
    // Fisicamnete lo borramos 

    const usuario = await Usuario.findByIdAndDelete(id);
    
    res.json({usuario,uid});
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