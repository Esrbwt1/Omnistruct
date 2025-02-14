// server.js
const WebSocket = require('ws');

const port = 8080;
const server = new WebSocket.Server({ port });

server.on('connection', ws => {
  console.log('New client connected.');

  ws.on('message', message => {
    console.log(`Received message: ${message}`);
    // For demonstration, simply echo the message back
    ws.send(`Server echoes: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected.');
  });
});

console.log(`WebSocket server is running on ws://localhost:${port}`);