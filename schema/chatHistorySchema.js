const mongoose=require("mongoose")
const historySchema=new mongoose.Schema({
    "prompt":String,
    "response":String

}) 

const historyModel= new mongoose.model(historySchema,historyModel,"history")