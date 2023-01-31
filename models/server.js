
const express = require('express');
class Server{
    constructor()
    {
        this.app = express();
        this.port = process.env.PORT;
        
        //Middlewares
        //Los middlewares son funciones
        //que se ejecutan cuando se lanze el 
        //servidor
        this.middlewares();


        this.routes();
    }
    middlewares()
    {
        //Directorio publico
       this.app.use(express.static('public')); 
    }
    routes()
    {
        this.app.get('/api', (req, res) => {
            // res.send('Hello World!')
            res.json({
                msg:"get api"
            });
        });
        this.app.put('/api', (req, res) => {
            // res.send('Hello World!')
            res.json({
                msg:"put api"
            });
        });
        this.app.post('/api', (req, res) => {
            // res.send('Hello World!')
            res.json({
                msg:"post api"
            });
        });
        this.app.delete('/api', (req, res) => {
            // res.send('Hello World!')
            res.json({
                msg:"delete api"
            });
        });
        this.app.patch('/api', (req, res) => {
            // res.send('Hello World!')
            res.json({
                msg:"patch api"
            });
        });
    }

    listen()
    {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        });
    }
}
module.exports = Server;
