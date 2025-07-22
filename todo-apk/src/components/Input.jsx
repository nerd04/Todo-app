import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks';

export default function Input() {
  const [todosList, setTodosList] = useState([]);
  const [inputTodo, setInputTodo] = useState('');

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get(API_URL);
    console.log(response.data);
    setTodosList(response.data);
  };


  const handleInputChange = (e) => {
    setInputTodo(e.target.value);
  };

  const handleAddTodo = async () => {
    if (inputTodo.trim() === '') return;
    const response = await axios.post(API_URL, { task: inputTodo.trim() });
    setTodosList([...todosList, response.data]);
    setInputTodo('');
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodosList(todosList.filter((todo) => todo.id !== id));
  };

  const handleCompleted = async (id, currentStatus) => {
    const response = await axios.put(`${API_URL}/${id}`, { completed: !currentStatus });
    setTodosList(
      todosList.map((todo) =>
        todo.id === id ? { ...todo, completed: response.data.completed } : todo
      )
    );
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 bg-white rounded shadow">
      {/* Input Field */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          value={inputTodo}
          onChange={handleInputChange}
          placeholder="Enter a task..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          ADD
        </button>
      </div>

      {/* Task List */}
      {todosList.length === 0 ? (
        <p className="text-center text-gray-500">There is no task to show!</p>
      ) : (
        <ul className="space-y-2">
          {todosList.map((item) => (
            <li
              key={item.id}
              className={`flex justify-between items-center bg-gray-50 px-4 py-2 rounded shadow-sm ${
                item.completed ? 'line-through text-red-400' : ''
              }`}
            >
              <span className="text-gray-800 break-words">{item.task}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleCompleted(item.id, item.completed)}
                  className="text-green-500 hover:text-green-700"
                  title="Mark as Completed"
                >
                  ✅
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
