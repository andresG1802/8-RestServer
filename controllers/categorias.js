const { response, request } = require("express");

const { Categoria } = require('../models/index');

const crearCategoria = async(req=request,res=response)=>{

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.finOne({nombre});


    if(categoriaDB)
    {
        return res.status(400).json({
            msg:`La categoria ${categoriaDB.nombre}, ya existe`
        });
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json({
        categoria
    });
}

module.exports = {
    crearCategoria
}