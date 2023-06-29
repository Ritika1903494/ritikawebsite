const jwt=require('jsonwebtoken');
const empModel=require("../model/emp_schema")
const tokModel=require("../model/token_schema")
const  ObjectID = require('mongodb').ObjectId;

exports.getfun=async(req,res)=>{
  const user=await empModel.find({})
  try{
         res.status(200).send(user)
  }
  catch(error){
            res.status(500).send(error)
  }
}
//without middleware
exports.getfuns=async(req,res)=>{
  const user=await empModel.find({})
  try{
         res.status(200).send(user)
  }
  catch(error){
            res.status(500).send(error)
  }
}

exports.getfunid=async(req,res)=>{
  const user=await empModel.findById({_id:ObjectID(req.params._id)})
  try{
         res.status(200).send(user)
  }
  catch(error){
            res.status(500).send(error)
  }
}

exports.Sign_in=async(req,res) =>{
  const user_email=req.body.email;
  console.log(user_email);
  const user_pass=req.body.password;
  console.log(user_pass);
  // {"key":"value"}
  // {user_email}
  // {user_email:user_email}
  try{
    const user=await empModel.findOne({email:user_email})
    console.log(user);
      if(!user){
        console.log(user);
       return res.status(422).send({message:"email or password is not valid"})
      } 
      if(user.password==user_pass){
        const token=jwt.sign({_id:user._id},"rerfvgfvgmgmhbjhnjkikmiouuytyrerer",{expiresIn:86400}); 
        const unique_tok=new tokModel({token})
        console.log(unique_tok);
        unique_tok.save();
        return res.status(200).send({"email":user.email,"role":user.role,"age":user.age,"token":unique_tok.token})
      }
      else{
       return res.status(422).send({message:"email or password is not valid"})
      }   
  }
  catch(error){
       console.log(error);
      return res.status(500).send(error)
      
  }
}

exports.postfun=async(req,res) =>{
  const user=new empModel(req.body)
      console.log("a")
  try{
      await user.save()
      res.status(200).send({status:true,user:user})
  }
  catch(error){
       res.status(500).send(error)
      
  }
}


exports.putfun=async(req,res)=>{
  const update=req.body
      console.log(req.params._id)
      const result= await empModel.updateOne({_id:ObjectID(req.params._id)},{$set:update})
  try{
      
      res.status(200).send({status:true,result:result})
  }
  catch(error){
      res.status(500).send(error)
  }
}
exports.deletefun=async(req,res)=>{
  const user= await empModel.deleteOne({_id:new ObjectID(req.params._id)})

  try{
      res.status(200).send(user)
  }
  catch(error){
      res.status(500).send(error)
  }
}
