const mongoose=require("mongoose")
const user=new mongoose.Schema({"email":{type:String}})
const userModel=new mongoose.model("userModel",user,"users")
module.exports=userModel

