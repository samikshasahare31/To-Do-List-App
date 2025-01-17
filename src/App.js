import React, { useState } from 'react';
import TaskList from './Components/TaskList';
import TaskModal from './Components/TaskModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addTask, deleteTask, fetchTasks, updateTask } from './services/taskService';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); 

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, idx) => idx !== index));
  };

  const handleSaveTask = (task) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t === editingTask ? task : t)));
    } else {
      handleAddTask(task);
    }
    setEditingTask(null); 
  };

 
  const filteredTasks = tasks.filter((task) =>
    task.assignedTo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.comments?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const manageTasks = async () => {
    try {
      const newTask = await addTask('Learn MERN stack');
      console.log('Added task:', newTask);
    } catch (error) {
      console.error('Error managing tasks:', error);
    }
  };

  manageTasks();

  return (
    <div className="App">
      <h1>To-Do List</h1>

      <div className="d-flex justify-content-evenly align-items-center mb-3">
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingTask(null); 
            setShowModal(true); 
          }}
        >
          Add Task
        </button>
        <input
          type="text"
          className="form-control"
          style={{ width: '30%' }} 
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <TaskList
        tasks={filteredTasks} 
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />

      <TaskModal
        showModal={showModal}
        onClose={() => setShowModal(false)} 
        onSave={handleSaveTask} 
        selectedTask={editingTask} 
      />
    </div>
  );
};

export default App;
