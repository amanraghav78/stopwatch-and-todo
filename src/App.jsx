
import './App.css'
import React, { useState, useEffect } from 'react';

const App = () => {
  const [time, setTime] = useState(() => Number(localStorage.getItem('time')) || 0);
  const [isRunning, setIsRunning] = useState(false);
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || []);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    localStorage.setItem('time', time);
  }, [time]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const toggleTodoCompletion = index => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDeleteTodo = index => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleClearTodos = () => {
    setTodos([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-400 font-mono flex flex-col items-center p-4">
      <div className="stopwatch text-7xl flex-grow flex items-center justify-center">
        {new Date(time * 1000).toISOString().substr(11, 8)}
      </div>
      <div className="controls mt-4 text-center">
        <button
          onClick={handleStartStop}
          className="button text-gray-400 text-2xl mx-2 no-underline hover:text-white"
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          className="button text-gray-400 text-2xl mx-2 no-underline hover:text-white"
        >
          Reset
        </button>
      </div>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">To-Do List</h2>
      <div className="flex mb-4 w-full max-w-md">
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border border-gray-600 rounded-l px-4 py-2 w-full bg-gray-800 text-gray-300"
          placeholder="Add a new task"
        />
        <button
          onClick={handleAddTodo}
          className="bg-green-700 text-white px-4 py-2 rounded-r hover:bg-green-800 transition duration-300"
        >
          Add
        </button>
      </div>
      <ul className="w-full max-w-md mb-4">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-4 mb-2 border rounded ${
              todo.completed ? 'bg-gray-700 line-through text-gray-500' : 'bg-gray-800 text-gray-300'
            }`}
          >
            <span>{todo.text}</span>
            <div>
              <button
                onClick={() => toggleTodoCompletion(index)}
                className={`px-3 py-1 rounded mr-2 ${
                  todo.completed ? 'bg-gray-600 text-white' : 'bg-yellow-600 text-white'
                } hover:bg-yellow-700 transition duration-300`}
              >
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => handleDeleteTodo(index)}
                className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 transition duration-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleClearTodos}
        className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition duration-300 mb-8"
      >
        Clear All
      </button>
    </div>
  );
};

export default App;
