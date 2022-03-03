import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
    // todos array
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("");
    const [todoEditing, setTodoEditing] = useState(null); // id of the todo we are editing
    const [editingText, setEditingText] = useState(""); // text of the todo we editing

    // get todos from local storage if exist
    useEffect(() => {
        if (localStorage.getItem("jsonTodos") !== null) {
            const temp = localStorage.getItem("jsonTodos");
            const loadedTodos = JSON.parse(temp);
            setTodos(loadedTodos);
        }
    }, []);

    // save todos every time todos array is updated to browser local storage for persistence
    useEffect(() => {
        const jsonTodos = JSON.stringify(todos);
        localStorage.setItem("jsonTodos", jsonTodos);
    }, [todos]);

    // Add Todo button
    function handleSubmit(event) {
        event.preventDefault();

        const newTodo = {
            id: new Date().getTime(), // just a way to generate a unique value
            text: todo,
            completed: false,
        };

        setTodos([...todos].concat(newTodo)); // concat merges two arrays and returns result
        setTodo("");
    }

    function deleteTodo(id) {
        const updatedTodos = [...todos].filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }

    // checkbox
    function toggleComplete(id) {
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });

        setTodos(updatedTodos);
    }

    function editTodo(id) {
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.text = editingText;
            }
            return todo;
        });
        setTodos(updatedTodos);
        setTodoEditing(null); // id of todo we're editing
        setEditingText("");
    }

    return (
        <div className="todo-app">
            <h1>Todo App</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(event) => setTodo(event.target.value)}
                    value={todo}
                />
                <button type="submit">Add todo</button>
            </form>

            <div id="todo-list">
                {todos.map((todo) => (
                    <div key={todo.id} className="todo">
                        <div>
                            {todoEditing === todo.id ? (
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setEditingText(e.target.value)
                                    }
                                    value={editingText}
                                />
                            ) : (
                                <div className="todo-text">{todo.text}</div>
                            )}
                        </div>

                        <div className="controls">
                            {todoEditing === todo.id ? (
                                <>
                                    <button
                                        className="ok-btn"
                                        onClick={() => editTodo(todo.id)}
                                    >
                                        OK
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => setTodoEditing(null)}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteTodo(todo.id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="edit-btn"
                                        onClick={() => setTodoEditing(todo.id)}
                                    >
                                        Edit
                                    </button>
                                </>
                            )}

                            <input
                                type="checkbox"
                                onChange={() => toggleComplete(todo.id)}
                                checked={todo.completed}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
