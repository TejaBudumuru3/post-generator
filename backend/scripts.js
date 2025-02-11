require("dotenv").config()
const express = require("express")
const axios = require("axios")
const route = require("./routes/postRoute")

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5000

app.get("/",(req,res)=>{
    res.send("server is running")
})

app.use("/",route)

app.listen(PORT,()=>{
    console.log(`server started on ${PORT} port`)
})
