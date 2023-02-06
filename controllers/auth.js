const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuarios');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");



const login = async(req,res)=>{

    const { correo , password }  = req.body;

    try{
        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        
        if(!usuario)
        {
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            });
        }
        //Si el usuario esta activo
        if(!usuario.estado)
        {
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado: false'
            });
        }
        //Verificar la contraseña

        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword)
        {
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password'
            });
        }       
        //Generar el JWT
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        });
        //este return sirve para que no de un error al regresar dos peticiones
        return;

    } catch (error){
        console.log(error);
        
         res.status(500).json({
            msg:'Hable con el administrador'
        });
    }

    res.json({
        msg:'Login ok'
    });
}

const googleSignIn = async(req,res=response)=>{

    const {id_token} = req.body;
    // try{
        
    //     const {nombre,img,correo} = await googleVerify(id_token);
        
    //     
    //     if(!usuario)
    //     {
    //         //Tengo que crearlo
    //         const data = {
    //             nombre,
    //             correo,
    //             password:':P',
    //             img,
    //             google : true
    //         };

    //         usuario = new Usuario(data);
            
    //         //Guardamos en db
    //         await usuario.save();
    //     }
    //     // Si el usuario en DB 
    //     if(!usuario.estado)
    //     {
    //         return res.status(401).json({
    //             msg:"Hable con el administrador, usuario bloqueado"
    //         });
    //     }

    //     const token = await generarJWT(usuario.id);
    //     res.json({
    //         usuario,
    //         token
    //     });

    // }catch(error){
    //     res.status(400).json({
    //         ok:false,
    //         msg: ' El Token no se pudo verificar'
    //     });
    // }
    try{
        const {correo,img,nombre} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});
        if(!usuario)
        {
            const data = {
                nombre,
                correo,
                password:':P',
                img,
                google: true
            }
            //Suave con construir objetos chequea los atributos y el default
            usuario = new Usuario(data);
            await usuario.save();
        }

        if(!usuario.estado)
        {
            return res.status(401).json({
                msg:"Hable con el administrador, usuario bloqueado"
            });
        }
        const token = await generarJWT(usuario.id);
        
        res.json({
           usuario,
           token
        });
    }catch(error)
    {
        res.status(400).json({
            
            msg:'El token no se pudo verificar'
        });
    }
    
}

module.exports = {
    login,
    googleSignIn
}