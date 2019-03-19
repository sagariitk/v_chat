var socket = io.connect('http://vijaysantoria.xyz:9000');

var message = document.getElementById('message'),
      user = document.getElementById('user'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');

btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      user : user.value
  });
  message.value = "";
});

socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.user + ': </strong>' + data.message + '</p>';
});
