const userModal=require("../schema/userSchema")
const userController=async(req,res)=>{
    const newUser=new userModal({"email":req.body.email})
    newUser.save()
    .then(()=>{
        console.log("user saved")
        res.send(req.body)
    }).catch(err=>{
        res.status(500).send(err)
    })
}
module.exports=userController