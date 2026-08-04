const mongoose=require("mongoose")
const historyModel=require("../schema/chatHistorySchema")
const historyUpdate=async(req,res)=>{
    // const newHistoryData= await historyModel.findOne({"email":req.email})
    // newHistoryData.email=req.body.email
    // newHistoryData.chats.push({"prompt":req.body.prompt,"response":req.body.response})
    // newHistoryData.save().then(()=>{
    //         console.log("saved")
    //     res.send(req.body)
    // }).catch(err=>{
    //     console.log(err)
    //     res.status(500).send(err)
    // })

}
module.exports=historyUpdate