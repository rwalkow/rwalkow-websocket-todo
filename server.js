const express = require('express');
const path = require('path');
const socket = require('socket.io');

const tasks = [
  { id: 1, name: 'Shopping' },
  { id: 2, name: 'Go out with a dog' }
];

const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server, {cors: {origin: "http://localhost:3000"}});

io.on('connection', (socket) => {
  socket.emit('updateData', tasks);

socket.on('addTask', (task) => {
  tasks.push(task);
  socket.broadcast.emit('addTask', task);
});


socket.on('removeTask', (id) => {
  const taskIndex = tasks.findIndex(tasks => tasks.id == id);
    if (taskIndex >= 0) {
      tasks.splice(taskIndex, 1);
      socket.broadcast.emit('removeTask', id);
    }
  });
});

app.use((req, res) => {
  if (res.status(404)) res.json({ message: '404: Page not found!' });
})
