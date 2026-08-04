const express=require("express")
const mongoose=require("mongoose")
const path=require("path")
const historyUpdate=require("./controller/historyUpdate")
const userController=require("./controller/userController")
require("dotenv").config()
const app=express()
app.use(express.json())
app.use(express.text())
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"./public/index.html"))
})
app.post("/historyUpdate",historyUpdate)
app.post("/userController",userController)
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`SERVER RUNNING ON ${port}`)
})
const mongooseConnect=async()=>{
    try {

  await  mongoose.connect("mongodb+srv://eazybel27_db_user:FhqEdkSGRO73FwCW@cluster0.zih5j6f.mongodb.net/?appName=Cluster0")
    console.log("DB CONNECTED")

} catch (error) {
    console.log(error)
}
}
 mongooseConnect()