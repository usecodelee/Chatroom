const express = require('express');
const app = express();
app.use(express.static(__dirname));

const server = require('http').createServer(app);

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    socket.send('服务端的消息1');
    socket.on('message', (msg) => {
        console.log(msg);
        socket.send('服务端的消息2');
    });
});
server.listen(3000);