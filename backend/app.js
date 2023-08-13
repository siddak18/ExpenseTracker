import express from 'express'
import cors from 'cors'
import connect from './database/connection.js';
import route from './routes/route.js';

const app=express();
app.use(cors());
app.use(express.json());
connect();
app.use("/",route);
app.listen(8000,()=>{
    console.log("live at port 8000");
});