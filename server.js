const express=require("express")
const path=require("path")
require("dotenv").config()
const app=express()
app.use(express.json())
app.use(express.text())
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"./public/index.html"))
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`SERVER RUNNING ON ${port}`)
})