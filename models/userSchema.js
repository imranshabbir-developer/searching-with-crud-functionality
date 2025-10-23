const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    age:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
    work:{
        type:String,
        required:true,
    },
    add:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
});


const HPcrud = new mongoose.model("hpcrud",userSchema);

module.exports = HPcrud;