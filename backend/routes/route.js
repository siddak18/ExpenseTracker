import express from "express";
import { addtrans, adduser, deletetrans, gettrans, login, signin } from "../controller/route_function.js";


const route=express.Router();


route.get("/",login);
route.post("/",adduser);
route.post("/signup",signin);
route.post("/home/:id",addtrans);
route.get("/user/:name",gettrans);
route.delete("/:id/:name",deletetrans);

export default route;
