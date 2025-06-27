import React, { useState, useEffect } from "react";
import './Main.css';
import { useNavigate } from "react-router-dom";
import {fetchTodos, createTodo, updateTodo, deleteTodo} from "./apiRoutes"; 

function Main() {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");
    const [showId, setShowId] = useState(null); 
    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    
    useEffect(() => {
        const loadTodos = async () => {
            try {
                const res = await fetchTodos();
                setTodos(res.data);
            } catch (err) {
                console.error("Unable to fetch todos!", err);
            }
        };
        loadTodos();
    }, []);
    
    const handleAdd = async () => {
        if (!newTask.trim()) return;
        try {
            const res = await createTodo({ title: newTask });
            setTodos([...todos, res.data]); 
            setNewTask("");
        } catch (err) {
            console.error("Unable to add task", err);
        }
    };
    
    const handleToggle = async (todo) => {
        try {
            const updated = await updateTodo(todo._id, {
                completed: !todo.completed
            });
            setTodos((prev) =>
                prev.map((t) => (t._id === todo._id ? updated.data : t))
        );
        } catch (err) {
            console.error("Error updating todo", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTodo(id);
            setTodos((prev) => prev.filter((t) => t._id !== id));
        } catch (err) {
            console.error("Error deleting todo", err);
        }
    };

    const handleEdit = (todo) => {
        setEditId(todo._id);
        setEditText(todo.title);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editText.trim()) return;

        try {
            const updated = await updateTodo(editId, { title: editText });
            setTodos((prev) => prev.map((t) => (t._id === editId ? updated.data : t))
            );
            setEditId(null);
            setEditText("");
        } catch (err) {
          console.error("Error editing todo", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
  
  return (
    <div className="todo-wrapper">
        <h1>Hello {username}, lets get started</h1>

        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
        
        <div className="todo-list">
            {todos.map((todo) => (
                <div key={todo._id} 
                className={`todo-item ${todo.completed ? "completed" : ""}`} 
                onMouseEnter={() => setShowId(todo._id)} 
                onMouseLeave={() => setShowId(null)}
                >
                <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo)}
                style={{ marginRight: "10px" }}
                />
                
                {editId === todo._id ? (
                    <form onSubmit={handleEditSubmit} style={{ flex: 1 }}>
                        <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        autoFocus
                        />
                    </form>
                ) : (
                <span style={{ flex: 1 }}>{todo.title}</span>
                )}
                
                {showId === todo._id && (
                    <div className="menu">
                    <span onClick={() => handleEdit(todo)}>✏️</span>
                    <span onClick={() => handleDelete(todo._id)}>🗑️</span>
                    </div>
                )}
                </div>
            ))}
        </div>

        <div className="add-task">
            <button onClick={handleAdd}>+</button>
            <input
            type="text"
            placeholder="New task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            />
        </div>
    </div>
  );
}

export default Main;