const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Listing on Port ${PORT}`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//Socket

const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('connected...');
  socket.on('chat', (msg) => {
    socket.broadcast.emit('chat', msg);
  });
  socket.on('disconnect', () => {
    console.log('disconnect...');
  });
});
