const productModel=require("../model/product_schema")
const  ObjectID = require('mongodb').ObjectId;

exports.getproduct=async(req,res)=>{
  const product=await productModel.find({})
  try{
         res.status(200).send(product)
  }
  catch(error){
            res.status(500).send(error)
  }
}

exports.getProductById=async(req,res)=>{
    const product=await productModel.findById({_id:ObjectID(req.params._id)})
    try{
           res.status(200).send(product)
    }
    catch(error){
              res.status(500).send(error)
    }
  }

  exports.postproduct=async(req,res) =>{
    const product=new productModel(req.body)
        console.log("a")
    try{
        await product.save()
        res.status(200).send({status:true,product:product})
    }
    catch(error){
         res.status(500).send(error)
        
    }
  }
  
  
  exports.putproduct=async(req,res)=>{
    const update=req.body
        console.log(req.params._id)
        const result= await productModel.updateOne({_id:ObjectID(req.params._id)},{$set:update})
    try{
        
        res.status(200).send({status:true,result:result})
    }
    catch(error){
        res.status(500).send(error)
    }
  }
  exports.deleteproduct=async(req,res)=>{
    const product= await productModel.deleteOne({_id:new ObjectID(req.params._id)})
  
    try{
        res.status(200).send(product)
    }
    catch(error){
        res.status(500).send(error)
    }
  }
  