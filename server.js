const express=require("express")
require("dotenv").config()
const app=express()
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))
const port=process.env.PORT
app.use(express.static("public"))
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html"))
})
app.listen(port,()=>{
    console.log(`SERVER RUNNING`)
})