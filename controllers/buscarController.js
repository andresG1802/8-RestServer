const { response, request } = require("express");
const {ObjectId} = require('mongoose').Types;

const {Usuario,Categoria,Producto, Role} = require('../models')


const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async(termino = '', res = response)=>{

    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID)
    {
        
        const usuario = await Usuario.findById(termino);

        return res.json({
            results: (usuario) ? [usuario]:[]
        });
    }
    //Expresion regular la i es para quitar la sensibilida
    //a mayusculas y minisculas
    const regex = new RegExp(termino,'i');

    const usuarios = await Usuario.find({
        $or:[{nombre:regex},{correo:regex}],
        $and : [{estado:true}]
    });

    res.json({
        results: usuarios
    });
}
const buscarCategorias=async(termino='',res=response)=>
{
    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID)
    {
        
        const categoria = await Categoria.findById(termino);

        return res.json({
            results: (categoria) ? [categoria]:[]
        });
    }

    const regex = new RegExp(termino,'i');

    const categorias = await Categoria.find({
        $or:[{nombre:regex}],
        $and:[{estado:true}]
    });

    res.json({
        results:categorias
    })
}
const buscarProductos= async(termino = '',res = response)=>{
    
    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID)
    {
        
        const producto = await Producto.findById(termino).populate('categoria','nombre');

        return res.json({
            results: (producto) ? [producto]:[]
        });
    }

    const regex = new RegExp(termino,'i');
    
    const productos = await Producto.find({
        $or:[{nombre:regex}],
        $and:[{estado:true}]
    }).populate('categoria','nombre');

    res.json({
        results:productos
    })

}
const buscarRoles = async(termino= '',res=response)=>
{
    
    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID)
    {
        
        const roles= await Role.findById(termino);

        return res.json({
            results: (roles) ? [roles]:[]
        });
    }
    const regex = new RegExp(termino,'i');

    const roles = await roles.find({
        $or:[{rol:regex}]
    });

    res.json({
        results:roles
    });

}

const buscar = ( req = request , res = response)=>{
    
    const {coleccion,termino} = req.params;
    
    if( !coleccionesPermitidas.includes(coleccion))
    {
        return res.status(400).json({
            msg:`Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }

    switch(coleccion){
        case 'usuarios':
            buscarUsuarios(termino,res);
            break;
        case 'categorias':
            buscarCategorias(termino,res);
            break;
        case 'productos':
            buscarProductos(termino,res);
            break;
        case 'roles':
            buscarRoles(termino,res);
            break;
        default:
            res.status(500).json({
                msg:'Se le olvido hacer esta busqueda'
            });
    }
}


module.exports = {
    buscar,
    buscarUsuarios,
    buscarCategorias,
    buscarProductos,
    buscarRoles
}