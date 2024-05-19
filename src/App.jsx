import './App.css'
import React, { useState, useEffect } from 'react';

const App = () => {
  const [time, setTime] = useState(() => Number(localStorage.getItem('time')) || 0);
  const [isRunning, setIsRunning] = useState(false);
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || []);
  const [newTodo, setNewTodo] = useState('');
  const [date, setDate] = useState(() => new Date().toLocaleDateString());
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('history')) || []);

  useEffect(() => {
    localStorage.setItem('time', time);
  }, [time]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

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

  useEffect(() => {
    const handleNewDay = () => {
      const newDate = new Date().toLocaleDateString();
      setDate(newDate);

      const completedTasks = todos.filter(todo => todo.completed).length;
      const dayHistory = { date: newDate, completedTasks };
      setHistory([...history, dayHistory]);

      setTodos(prevTodos => prevTodos.map(todo => ({ ...todo, completed: todo.completed ? todo.completed : false })));
    };

    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const timeUntilMidnight = midnight - now;

    const midnightTimeout = setTimeout(() => {
      handleNewDay();
      setInterval(handleNewDay, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimeout);
  }, [todos, history]);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-semibold mb-2 text-gray-800">Stopwatch</h1>
      <div className="text-xl mb-8 text-gray-600">{date}</div>
      <div className="text-5xl font-mono mb-8 text-gray-700">
        {new Date(time * 1000).toISOString().substr(11, 8)}
      </div>
      <div className="mb-8">
        <button
          onClick={handleStartStop}
          className="bg-blue-600 text-white px-4 py-2 rounded mr-4 hover:bg-blue-700 transition duration-300"
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
        >
          Reset
        </button>
      </div>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">To-Do List</h2>
      <div className="flex mb-4 w-full max-w-md">
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border border-gray-300 rounded-l px-4 py-2 w-full"
          placeholder="Add a new task"
        />
        <button
          onClick={handleAddTodo}
          className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-700 transition duration-300"
        >
          Add
        </button>
      </div>
      <ul className="w-full max-w-md mb-4">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-4 mb-2 border rounded ${
              todo.completed ? 'bg-gray-200 line-through text-gray-500' : 'bg-white text-gray-800'
            }`}
          >
            <span>{todo.text}</span>
            <div>
              <button
                onClick={() => toggleTodoCompletion(index)}
                className={`px-3 py-1 rounded mr-2 ${
                  todo.completed ? 'bg-gray-400 text-white' : 'bg-yellow-500 text-white'
                } hover:bg-yellow-600 transition duration-300`}
              >
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => handleDeleteTodo(index)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleClearTodos}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 mb-8"
      >
        Clear All
      </button>
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">History</h2>
      <ul className="w-full max-w-md">
        {history.map((entry, index) => (
          <li key={index} className="flex justify-between items-center p-4 mb-2 border rounded bg-white text-gray-800">
            <span>{entry.date}</span>
            <span>{entry.completedTasks} tasks completed</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
