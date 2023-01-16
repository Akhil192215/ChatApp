const express = require('express')
const app = express()
const chats= require('./data')
const dotenv = require("dotenv")
const connectDB = require('./config/db')
const colors = require('colors')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')


dotenv.config()
connectDB()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('hello expresss')
})

app.use('/api/user',userRoutes)
app.use('/api/chats',chatRoutes)

app.listen(7000,()=>{
    console.log('server listening at port 7000'.blue.bold);
})