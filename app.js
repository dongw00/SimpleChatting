const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => res.sendFild(__dirname) + '/index.html');

io.on('connection', socket => {
  socket.on('login', data => {
    console.log(`Client log-in name: ${data.name}`);
    console.log(`userID = ${data.userid}`);

    socket.name = data.name;
    socket.userid = data.userid;

    io.emit('login', data.name);
  });

  socket.on('chat', data => {
    console.log(`Message from ${socket.name}, ${data.msg}`);

    const msg = {
      from: {
        name: socket.name,
        userid: socket.userid,
      },
      msg: data.msg,
    };

    socket.broadcast.emit('chat', msg);
  });

  socket.on('forceDisconnect', () => socket.disconnect());
  socket.on('disconnect', () =>
    console.log(`user disconnected: ${socket.name}`)
  );
});

server.listen(3000, () => {
  console.log('Socket IO Server listening on port 3000');
});
