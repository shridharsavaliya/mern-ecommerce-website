const { default: mongoose } = require("mongoose");

const user_Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilepicture:{
        type:String
    },
    role:{
        type:String,
        // default:"GENERAL" 
    }
    
},{
    timestamps:true,
    versionKey:false
})

const usermodel = mongoose.model("user",user_Schema)

module.exports = usermodel