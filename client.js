// client.js
const WebSocket = require('ws');

const serverUrl = 'ws://localhost:8080';
const ws = new WebSocket(serverUrl);

ws.on('open', () => {
  console.log('Connected to server.');
  // Send a test message once connected
  ws.send('Hello from the client!');
});

ws.on('message', message => {
  console.log(`Received: ${message}`);
});

ws.on('close', () => {
  console.log('Disconnected from server.');
});