const mongoose = require('mongoose');

const dbConnection = async()=>{
    
    try{
        
        // await mongoose.connect(process.env.MONGODB_CNN,{
        //     useNewUrlParser : true,
        //     useCreateIndex: true,
        //     useCreateIndex: true,
        //     useFindAndModify: false
        // });
        await mongoose.set("strictQuery", false);//Para quitar el mensaje de DeprecationWarning
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Base de datos online');

    }catch(error)
    {
        throw new Error('Error a la hora de iniciar la base de datos');
    }

}


module.exports = {
    dbConnection
}