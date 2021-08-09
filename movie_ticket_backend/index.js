const express= require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const {initDatabase} = require("./repositories/index")
const router = require("./api/index")

const app=express()
app.use(cors())
app.use(bodyParser.json())

initDatabase()


app.use(router)

app.listen(process.env.PORT,(err) =>{
    if(!err){
        console.log("App is running at " + process.env.PORT)
    }
})