const mongoose=require("mongoose")

const ProductSchema= new mongoose.Schema({
    productname:{
        type:String,
        lowercase:true,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    manufactured:{
        type:Date,
        required:true
    },
    companyname:{
        type:String,
        lowercase:true,
        required:true
    },
    quality:{
        type:String,
        required:true
    }
})

const Product= mongoose.model("Product",ProductSchema)

module.exports = Product