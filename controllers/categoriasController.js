const { response, request } = require("express");

const { Categoria } = require('../models/index');

const crearCategoria = async(req=request,res=response)=>{

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});


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
//Listar Categoria
const getCategoria = async(req,res = response)=>{

    const {limite = 5,desde = 0} = req.query;
    const query ={estado:true};


    const [total,categorias]=await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.json({
        total,
        categorias
    })
}
const getIdCategoria = async(req,res = response)=>{

    const {id} = req.body;
    
    const categoria = await Categoria.findById(id);
    res.json({
        categoria
    });

}
//Actualizar Categoria
const putCategoria  = async(req=request,res=response)=>{

    // const {id} = req.params;
    const {id,nombre}=req.body;

    const categoria = await Categoria.findByIdAndUpdate(id,{nombre},{new:true});

    res.json({
        categoria    
    });
}

const deleteCategoria = async(req=request,res=response)=>{

    const {id} = req.body;
    const categoriaEliminada =  await Categoria.findByIdAndUpdate(id,{estado:false},{new:true});
    res.json({
        msg:"Categoria eliminada: ",
        categoriaEliminada,
    });
}

module.exports = {
    crearCategoria,
    getCategoria,
    getIdCategoria,
    putCategoria,
    deleteCategoria
}