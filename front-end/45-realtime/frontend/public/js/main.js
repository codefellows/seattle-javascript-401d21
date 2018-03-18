const socket = io('http://localhost:3000');

let sendMessageForm = document.getElementById('send-message-form');
let messageInput = document.getElementById('message-input');

sendMessageForm.addEventListener('submit', event => {
  event.preventDefault();
  let message = messageInput.value;
  socket.emit('SEND_MESSAGE', {message: message});
});

socket.on('RECEIVE_MESSAGE', (data) => {
  console.log('RECEIVE_MESSAGE',data);
});