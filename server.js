const express = require('express');
const https = require('https');
const fs = require('fs');
const socketIo = require('socket.io');

// SSL Certificate
const privateKey = fs.readFileSync('./privatekey.pem', 'utf8');
const certificate = fs.readFileSync('./certificate.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();
const httpsServer = https.createServer(credentials, app);
const io = socketIo(httpsServer);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('stream', (image) => {
        socket.broadcast.emit('stream', image);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});

const PORT = process.env.PORT || 3009;
httpsServer.listen(PORT, () => console.log(`Server running on HTTPS port ${PORT}`));
