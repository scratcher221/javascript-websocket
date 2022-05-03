import { createServer } from "http"
import { SocketAddress } from "net";
import { WebSocketServer } from "ws"

const server = new WebSocketServer({
  port: 8080
});

let sockets = [];
server.on('connection', function connection(socket) {
  sockets.push(socket);
  socket.on('message', function message(data) {
    console.log('received: %s', data);
  });
  socket.send('message from server');
  socket.on('close', function() {
    sockets = sockets.filter(s => s !== socket);
  });
});