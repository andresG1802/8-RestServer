//esto se hace para que reconozca a res 
const {request,response } = require('express');


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
const usuariosPost = (req,res) =>{

    const {nombre,Edad} = req.body;

    res.json({
        msg:"post api - controlador",
        nombre,
        Edad
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