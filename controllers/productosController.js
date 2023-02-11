const {response,request} = require("express");

const{Producto} = require('../models/index');



const crearProducto = async(req=request,res=response)=>{

    const nombre = req.body.nombre.toUpperCase();

    //Encontramos uno con el nombre
    const productoDB = await Producto.findOne({nombre});
    if(productoDB)
    {
        return res.status(400).json({
            msg:`La producto ${productoDB.nombre}, ya existe`
        });
    }

    const data = {
        nombre,
        usuario:req.usuario._id
    }
    
    const producto = new Producto(data);

    await producto.save();
    res.status(201).json({
        producto
    });
}
const getProducto = async(req,res=response)=>{
    const {limite = 5,desde = 0} = req.query;
    const query ={estado:true};


    const [total,productos]=await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario','nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        productos
    }); 

}
const getIdProducto = async(req,res = response)=>{

    const {id} = req.params;
    
    const producto = await Producto.findById(id).populate('usuario','nombre');
    res.json({
        producto
    });

}
const putProducto = async(req = request,res=response)=>{
    const {id,nombre} = req.body;

    const{estado,usuario,...data} = req.body;
    
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});
    res.json({
        categoria
    });
}
const deleteProducto = async(req=request,res=response)=>{
    const {id}=req.params;
    const productoEliminado = await Producto.findByIdAndUpdate(id,{estado:false},{new:true});
    res.json({
        msg:"Producto eliminado: ",
        productoEliminado
    });
}
module.exports = {
    crearProducto,
    getProducto,
    getIdProducto,
    putProducto,
    deleteProducto
}