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

const io = socket(server);

io.on('connection', (socket) => {
  socket.on('updateData', (tasks) => {
    console.log('Wysyłanie do nowego klienta listy tasków...');
    socket.broadcast.emit('updateData', tasks);
  });
});

app.use(express.static(path.join(__dirname, '/client/')));

app.use((req, res) => {
  if (res.status(404)) res.json({ message: '404: Page not found!' });
})
