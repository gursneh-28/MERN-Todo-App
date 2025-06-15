import React, { useState } from "react";
import Card from './Card';
import './Main.css';

function Todo() {
    const [showCard, setShowCard] = useState(false);
    const [task, setTask] = useState([]);

    const addTask = (newTask) => {
        if (newTask.trim() !== "") {
            setTask([...task, { text: newTask, completed: false }]);
        }
        setShowCard(false);
    };

    const toggleTask = (index) => {
        const updatedTasks = [...task];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTask(updatedTasks);
    };

    return (
        <div className="todo-app">
            <h1>TODO APP</h1>

            <div className="tasks-container">
                <div className="task-column">
                    <h2>ToDo Tasks</h2>
                    <ul>
                        {task.map((taskItem, index) => !taskItem.completed ? (
                            <li key={index}>
                                <input
                                    type='checkbox'
                                    checked={false}
                                    onChange={() => toggleTask(index)}
                                />
                                {taskItem.text}
                            </li>
                        ) : null)}
                    </ul>
                </div>

                <div className="task-column">
                    <h2>Completed Tasks</h2>
                    <ul>
                        {task.map((taskItem, index) => taskItem.completed ? (
                            <li key={index}>
                                <input
                                    type='checkbox'
                                    checked={true}
                                    onChange={() => toggleTask(index)}
                                />
                                <s>{taskItem.text}</s>
                            </li>
                        ) : null)}
                    </ul>
                </div>
            </div>

            <button className="add-task-btn" onClick={() => setShowCard(!showCard)}>+</button>
            {showCard && <Card addTask={addTask} />}
        </div>
    );
}

export default Todo;
