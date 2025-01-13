import React, { useState } from 'react';

type Todo = {
    id: number;
    text: string;
};

const TodoApp = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [editingText, setEditingText] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            setTodos([...todos, { id: Date.now(), text: inputValue }]);
            setInputValue('');
        }
    };

    const handleEditTodo = (id: number, currentText: string) => {
        setIsEditing(id);
        setEditingText(currentText);
    };

    const handleSaveTodo = (id: number) => {
        if (editingText.trim()) {
            setTodos(todos.map(todo => todo.id === id ? { ...todo, text: editingText } : todo));
            setIsEditing(null);
            setEditingText('');
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(null);
        setEditingText('');
    };

    const removeTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className='space-y-2'>
            <div className='flex items-center gap-3'>
                <input
                    type="text"
                    className='border border-gray-400 p-1 text-black'
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter todo"
                />
                <button onClick={handleAddTodo} className='bg-blue-500 text-white px-3 py-1 rounded'>
                    Add Todo
                </button>
            </div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className='flex items-center w-[300px] justify-between gap-4'>
                        {isEditing === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    className='border border-gray-400 p-1 text-black'
                                />
                                <div className='flex gap-2'>
                                    <button
                                        onClick={() => handleSaveTodo(todo.id)}
                                        className='bg-green-500 text-white px-2 py-1 rounded'
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className='bg-gray-500 text-white px-2 py-1 rounded'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p>{todo.text}</p>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={() => handleEditTodo(todo.id, todo.text)}
                                        className='bg-yellow-500 text-white px-2 py-1 rounded'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => removeTodo(todo.id)}
                                        className='bg-red-500 text-white px-2 py-1 rounded'
                                    >
                                        X
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
