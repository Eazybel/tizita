const mongoose=require("mongoose")
const historyModel=require("../schema/chatHistorySchema")
const historyUpdate=async(req,res)=>{
    const newHistoryData= new historyModel({"user.prompt":req.body.prompt,"user.response":req.body.response,"user.email":req.body.email})
    newHistoryData.save().then(()=>{
            console.log("saved")
        res.send(req.body)
    }).catch(err=>{
        console.log(err)
        res.status(500).send(err)
    })

}
module.exports=historyUpdate