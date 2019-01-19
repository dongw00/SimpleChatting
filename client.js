const socket = io();

socket.emit('login', {
  name: makeRandomName(),
});

socket.on('login', data => {
  alert(`환영합니다. ${data}`);
});

socket.on('chat', data => {});

function makeRandomName() {
  let name = 'user';
}
