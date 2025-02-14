// server.js
const WebSocket = require('ws');

const port = 8080;
const server = new WebSocket.Server({ port });

// Array to hold connected clients
let clients = [];
// Variable for round-robin task distribution
let currentClientIndex = 0;

// Function to send a task to a specific client
function sendTask(ws, task) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(task);
  }
}

// Function to generate a random factorial task (for numbers between 3 and 10)
function generateFactorialTask() {
  const num = Math.floor(Math.random() * 8) + 3; // Random number between 3 and 10
  return `TASK: factorial ${num}`;
}

// Function to distribute tasks to all connected clients in a round-robin manner
function distributeTask() {
  if (clients.length === 0) {
    console.log('No clients available to assign tasks.');
    return;
  }
  const task = generateFactorialTask();
  // Select a client based on round-robin
  const client = clients[currentClientIndex];
  console.log(`Sending task "${task}" to client ${currentClientIndex + 1}`);
  sendTask(client, task);

  // Update index for next client
  currentClientIndex = (currentClientIndex + 1) % clients.length;
}

server.on('connection', ws => {
  console.log('New client connected.');
  // Add new client to the list
  clients.push(ws);
  console.log(`Total connected clients: ${clients.length}`);

  ws.on('message', message => {
    // Convert message to string in case it's a buffer
    const msgStr = message.toString();
    console.log(`Received message: ${msgStr}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected.');
    // Remove client from the list
    clients = clients.filter(client => client !== ws);
    console.log(`Total connected clients: ${clients.length}`);
    // Adjust currentClientIndex if necessary
    if (currentClientIndex >= clients.length) {
      currentClientIndex = 0;
    }
  });
});

// Set an interval to distribute tasks every 20 seconds
setInterval(distributeTask, 20000);

console.log(`WebSocket server is running on ws://localhost:${port}`);