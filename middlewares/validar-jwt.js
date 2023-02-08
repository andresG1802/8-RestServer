const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');
//Hacemos una variable global para pasar el dato

const validarJWT = async(req=response,res=request, next)=>{

    const token = req.header('x-token');
    if(!token){

        return res.status(401).json({

            msg : 'No hay token en la peticion'
        })
    }   
    try{
        //Las escriptaciones correctas estan en el login
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        
        if(!usuario)
        {
            return res.status(401).json({
                msg:"Token no valido - usuario borrado"
            })
        }
        if(!usuario.estado)
        {
            return res.status(401).json({
                msg:"Token no valido - usuario con estado: false"
            })
        }
        req.usuario = usuario;
        next();
    }catch(error)
    {
        console.log(error);
        res.status(401).json({
            msg:'Token no válido'
        })
    }


    


}


module.exports = {

    validarJWT
}