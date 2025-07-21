import { useState } from 'react';

export default function Input({ setTodosList, TodosList }) {
    const [Itodo, setItodo] = useState('');

    const handleIpChange = (event) => {
        setItodo(event.target.value);
    };

    const handleAddBtn = () => {
        if (Itodo.trim() === '') return; // Prevent adding empty todos
        setTodosList([...TodosList, { key: Math.floor(1000 + Math.random() * 9000), task: Itodo.trim(), completed: false }]);
        setItodo('');
    };

    const handleEdit = (key) => {
        const index = TodosList.findIndex(todo => todo.key === key);
        const editable = TodosList.splice(index, 1)[0];
        setItodo(editable.task);
    };

    const handleDelete = (key) => {
        const newList = TodosList.filter(todo => todo.key !== key);
        setTodosList(newList);
    };

    const handleCompleted = (key) => {
        console.log(key)
        setTodosList(prev =>
            prev.map(todo =>
                todo.key === key ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }

    return (
        <div className="w-full max-w-xl mx-auto p-4 bg-white rounded shadow">
            {/* Input and Add Button */}
            <div className="flex items-center gap-2 mb-6">
                <input
                    type="text"
                    value={Itodo}
                    onChange={handleIpChange}
                    placeholder="Enter a task..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleAddBtn}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    ADD
                </button>
            </div>

            {/* Task List */}
            {TodosList.length <= 0 ? (
                <p className="text-center text-gray-500">There is no task to show!</p>
            ) : (
                <ul className="space-y-2">
                    {TodosList.map((item) => (
                        <li
                            key={item.key}
                            className={`flex justify-between items-center bg-gray-50 px-4 py-2 rounded shadow-sm ${item.completed ? 'line-through text-red-400' : ''}`}
                        >
                            <span className="text-gray-800 break-words">{item.task}</span>
                            <div className="space-x-2">
                                <button
                                    onClick={() => handleEdit(item.key)}
                                    className="text-blue-500 hover:text-blue-700"
                                    title="Edit"
                                    disabled={item.completed}
                                >
                                    <i>&#128393;</i>
                                </button>
                                <button
                                    onClick={() => handleDelete(item.key)}
                                    className="text-red-500 hover:text-red-700"
                                    title="Delete"
                                >
                                    <i>&#128465;</i>
                                </button>
                                <button
                                    onClick={() => handleCompleted(item.key)}
                                    className="text-red-500 hover:text-red-700"
                                    title="Delete"
                                >
                                    <i>&#9989;</i>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
