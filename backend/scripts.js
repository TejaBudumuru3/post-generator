require("dotenv").config()
const express = require("express")
const route = require("./routes/postRoute")
const Mroute = require("./routes/mistralRoute")
const ClaudeRoute = require("./routes/claudeRoute")
// const NitterRoute = require("./routes/nitter")

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5000

app.get("/",(req,res)=>{
    res.send("server is running")
})

app.use("/generate",route)

app.use("/mistral",Mroute)

app.use("/claude",ClaudeRoute)

// app.use("/nitter",NitterRoute)

app.listen(PORT,()=>{
    console.log(`server started on ${PORT} port`)
})
