import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import TasksList from '../src/components/features/TasksList/TasksList';
import AddForm from '../src/components/features/AddForm/AddForm';
import io from 'socket.io-client';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [socket, setSocket] = useState();
  useEffect(() => {
    if (!socket) {
      setSocket(io('http://localhost:8000'));
    }
  }, []);

  const addTask = (newTask) => {
    setTasks(task => [...task, newTask]);
  };

  useEffect(() => {
    socket.on('addTask', (task) => {
    addTask(task);
    });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName) alert("Please enter a task name");
    else {
      const newTask = { id: nanoid(), name: taskName };
      addTask(taskName);
      setTaskName('');
    }
  };

  const removeTask = (id) => {
    setTasks(tasks => tasks.filter(task => task.id !== id));
    socket.emit('removeTask', id);
  };

  return (
    <div className="App" >
      <header>
        <h1>ToDoList.app</h1>
      </header>
      <section className="tasks-section" id="tasks-section">
        <h2>Tasks</h2>
        <TasksList action={removeTask} tasks={tasks} />
        <AddForm action={handleSubmit} taskName={taskName} setTaskName={setTaskName}/>
      </section>
    </div>
  );
}

export default App;
