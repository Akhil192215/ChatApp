const app = require('express')()
const chats= require('./data')

app.get('/',(req,res)=>{
    res.send('hello expresss')
})

app.get('/api/chats',(req,res)=>{
    res.send(chats)
})
app.get('/api/chats/:userId',(req,res)=>{
    const user = chats.find((user=>user.id===req.params.id))
    res.send(user)
})

app.listen(7000,()=>{
    console.log('server listening at port 7000');
})