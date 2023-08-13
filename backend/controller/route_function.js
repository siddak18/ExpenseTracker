import model from "../model/user.js";



export const login=async(req,res)=>{
    const user= await model.findOne({username:req.body.username});
    res.json(user.transctions);
};

export const adduser=async(req,res)=>{
    console.log(req.body);
    const check=await model.findOne({username:req.body.username});
    if(!check){
    try{
    const user=await model.create({
        username:req.body.username,
        password:req.body.password,
        transctions:[]
    });
    await user.save();
    res.status(200).send("created");
}
    catch(err){
        console.log(err.message);
        res.status(401).send("fail");
    }}else{
        res.status(201).send("alredy");
    }
};



export const signin=async(req,res)=>{
    try{
        const check=await model.findOne({username:req.body.username});
        if(!check){
            res.send("notthere");
        }else{
            if(req.body.password===check.password){
                res.json(check._id);
            }else{
                res.send("notmatch");
            }
        }
    }catch(err){
        console.log(err.message);
    }
};



export const addtrans=async(req,res)=>{
    try {
        const user = await model.findOne({ username: req.params.id });
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        const newTransaction = req.body;
        user.transctions.push(newTransaction);
        await user.save();
        console.log(user);
        res.status(200).json(newTransaction);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
};

export const gettrans=async(req,res)=>{
    try{
        const user=await model.findOne({username:req.params.name});
        console.log(user);
        if(user){
       res.json(user.transctions);
        }else{
            res.send("user not found");
        }}catch(err){
            console.log(err.message);
        };
};

export const deletetrans=async(req,res)=>{
    try {
        const user=await model.findOne({username:req.params.name});
        if(user){
            const demo=user.transctions;
            const upd=[];
            demo.map((item,idx)=>{
                if(item.id!=req.params.id){
                    upd.push(item);
                }
            });
        user.transctions=upd;
        await user.save();

        res.json(upd);
        }else{
            throw new Error('user not found');
        }
    } catch (error) {
        console.log(error.message);
    }
};