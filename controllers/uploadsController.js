const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { request,response } = require("express");
const {subirArchivo} = require ('../helpers');

const {Usuario,Producto} = require('../models');


const cargarArchivo=async(req,res)=>{ 

    //Imagenes
    try
    {
        const nombre = await subirArchivo(req.files,['jpg','md'],'usuarios');
        res.json({nombre});
    }
    catch(msg)
    {
        res.status(400).json({msg});
    }           
}
const actualizarImagenCloudinary= async(req=request,res=response) =>{
    
    
    const {id,coleccion} = req.params;
    
    let modelo;
   
    switch(coleccion)
    {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo)
            {
                return res.status(400).json({
                    msg: `No exise un usuario con el id ${id}`
                });
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo)
            {
                return res.status(400).json({
                    msg: `No exise un usuario con el id ${id}`
                });
            }
        break;
        default:
            return res.status(500).json({msg:'Se me olvido validar esto'});
    }

    // Limpiar imagenes previas
    
    if(modelo.img)
    {
        //Hay que borrar la imagen del servidor 
        // const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
        // if(fs.existsSync(pathImagen))
        // {
        //     fs.unlinkSync(pathImagen);
        // }
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length -1];
        const [public_id] = nombre.split('.');   
        
        cloudinary.uploader.destroy(public_id);
    }
    //Para subir la imagen a cloudinary
    const{tempFilePath} = req.files.archivo;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);


    modelo.img = secure_url;
    
    await modelo.save();
    
    res.json(modelo);
}
const actualizarImagen= async(req=request,res=response) =>{
    
    
    const {id,coleccion} = req.params;
    
    let modelo;
   
    switch(coleccion)
    {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo)
            {
                return res.status(400).json({
                    msg: `No exise un usuario con el id ${id}`
                });
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo)
            {
                return res.status(400).json({
                    msg: `No exise un usuario con el id ${id}`
                });
            }
        break;
        default:
            return res.status(500).json({msg:'Se me olvido validar esto'});
    }

    // Limpiar imagenes previas
    try
    {
        if(modelo.img)
        {
            //Hay que borrar la imagen del servidor 
            const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
            if(fs.existsSync(pathImagen))
            {
                fs.unlinkSync(pathImagen);
            }

        }
        else{
            const pathImagen = path.join(__dirname,'../assets/noimagen.jpg')
            if(fs.existsSync(pathImagen))
            {
                return res.sendFile(pathImagen);
            }
        }
    }
    catch(error)
    {
        console.log(error);
    }

    const nombre = await subirArchivo(req.files,undefined,coleccion);
    
    modelo.img = nombre;
    
    await modelo.save();
    
    res.json(modelo);
}
const mostrarImagenes = async(req,res)=>{

    const {id,coleccion} = req.params;
    switch(coleccion)
    {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo)
            {
                return res.status(400).json({
                    msg: `No exise un usuario con el id ${id}`
                });
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo)
            {
                return res.status(400).json({
                    msg: `No exise un usuario con el id ${id}`
                });
            }
        break;
        default:
            return res.status(500).json({msg:'Se me olvido validar esto'});
    }
    if(modelo.img){
        //Hay que borrar la imagen del servidor 
        const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
        if(fs.existsSync(pathImagen))
        {
            return res.sendFile(pathImagen);
        }
    }
    else{
        const pathImagen = path.join(__dirname,'../assets/noimagen.jpg')
        if(fs.existsSync(pathImagen))
        {
            return res.sendFile(pathImagen);
        }
    }

    
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagenes,
    actualizarImagenCloudinary
}