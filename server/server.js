const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')

// 新建app
const app = express()

// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)


app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
server.listen(9093, function(){
    console.log('Example app listening at port 9093');
})