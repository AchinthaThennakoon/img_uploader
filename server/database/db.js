const mongoose = require('mongoose');
const config = require('../../config');

const connect = async()=>{
    try{
        //monodb connection
        const conn= await mongoose.connect(config.MONGO_URI,{
            //avoid unwanted erroe mssges
            useNewUrlParser : true,
            useUnifiedTopology: true
        })

        console.log(`MongoDB connected : ${conn.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connect;