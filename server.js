const express = require('express')
const app = express()
const http = require('http').createServer(app)
http.listen(3000, (req, res) => {
    console.log('listening on port 3000...')
})
const io = require('socket.io')(http)

var users =   []
var connections =   []
const ejs = require('ejs')
app.set('view engine', 'ejs')
const md5 = require('md5')


app.get('/', (req, res) => {
    var emailArray = []
    io.on('connection', (socket) => {
        console.log('connected')
        connections.push(socket)
        console.log(connections.length)
        socket.on('new-message', (message) => {
            console.log(message)

            io.emit('recieve-new-message', message)
        })
        socket.on('login', (email) => {
            emailArray.push(md5(email))

        })
    })
    console.log(emailArray)
    res.render('index', {
        data: {
            email: emailArray[0]
        }
    })
})