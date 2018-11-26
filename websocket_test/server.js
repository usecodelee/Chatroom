const express = require('express');
const app = express();
app.use(express.static(__dirname));
app.listen(3000);

// =============================================
const Server = require('ws').Server;
const ws = new Server({ port: 9999 }); // 这里是设置服务器的端口号，和上面的3000端口不用一致

// 服务器与客户端进行连接的监听
ws.on('connection', (socket) => {
    // 服务器来监听客户端发过来的消息
    socket.on('message', (msg) => {
        console.log(msg); // 这个msg就是客户端发过来的消息
        // 服务端也返回给客户端的数据
        socket.send(`服务端返回： ${msg}`);
    });
});