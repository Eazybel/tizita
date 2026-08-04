const mongoose=require("mongoose")
const historySchema=new mongoose.Schema({
    "user":{
        "prompt":{type:String},"response":{type:String},"email":{type:String}
    }

}) 

const historyModel= new mongoose.model("historyModel",historySchema,"historys")
module.exports=historyModel