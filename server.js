const express=require("express")
const path=require("path")
const rateLimiter=require("express-rate-limit")
require("dotenv").config()
const app=express()
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))
const limiter=rateLimiter({
    windowMs:15*60*1000,
    max:5,
    message:"Too many requests"
})
app.use(limiter)
app.use(express.static(path.join(__dirname, "public")))
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"./public/index.html"))
})
const port = process.env.PORT
app.listen(port, () => {
    console.log(`SERVER RUNNING`)
})

