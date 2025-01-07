import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();

const mongoURL= process.env.MONGO_URL_HOST



mongoose.connect(mongoURL , { useNewUrlParser: true, useUnifiedTopology: true });

const db=mongoose.connection;

db.on('connected',()=>{
    console.log('connected to mongodb');
    
})

db.on('error',(error)=>{
    console.log('Mongo db connection error',error);
    
});

db.on('disconnected',()=>{
    console.log('Mongodb discconected');
    
})


export default db;



