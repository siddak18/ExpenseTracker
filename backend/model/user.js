import mongoose from "mongoose";

const userschema=mongoose.Schema({
    username:String,
    password:String,
    transctions:[]
});
const model=mongoose.model("User",userschema);

export default model;