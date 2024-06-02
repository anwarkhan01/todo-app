import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { DeleteButton, EditButton, SaveButton } from "./components/Buttons";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState(null);
  const [checkedItems, setCheckedItems] = useState(
    new Array(todos.length).fill(false)
  );
  const editInputRef = useRef(null);

  useEffect(() => {
    if (editInputRef.current) {
      editInputRef.current.style.height = "auto";
      editInputRef.current.style.height =
        editInputRef.current.scrollHeight + "px";
    }
  }, [editText]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "" && !todos.includes(inputValue.trim())) {
      setTodos([...todos, inputValue.trim()]);
      setInputValue("");
    } else {
      alert("Please enter a unique non-empty todo.");
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    setCheckedItems(new Array(updatedTodos.length).fill(false));
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditText(todos[index]);
    todos[index] = null;
  };

  const handleEditInputChange = (event) => {
    setEditText(event.target.value);
  };

  const handleSaveTodo = () => {
    if (
      editText !== null &&
      editText.trim() !== "" &&
      !todos.includes(editText)
    ) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = editText;
      setTodos(updatedTodos);
      setEditIndex(null);
      setEditText(null);
    } else if (todos.includes(editText)) {
      alert("Enter a unique todo");
    } else {
      alert("Todo can't be empty");
    }
  };

  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };
  return (
    <div className="todo-app">
      <h2 className="heading">Todo App</h2>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => (e.key === "Enter" ? handleAddTodo() : null)}
          placeholder="Enter a new todo"
          className="input-field"
        />
        <button onClick={handleAddTodo} className="add-button">
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li className="list-item" key={index}>
            <input
              type="checkbox"
              checked={checkedItems[index]}
              onChange={() => handleCheckboxChange(index)}
            />
            {editIndex === index ? (
              <>
                <textarea
                  type="text"
                  ref={editInputRef}
                  value={editText}
                  onChange={handleEditInputChange}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? handleSaveTodo() : null
                  }
                  className="edit-input"
                />
                <div className="button-container">
                  <SaveButton onclick={handleSaveTodo} />
                </div>
              </>
            ) : (
              <>
                <p className="todo-content">{todo}</p>
                <div className="button-container">
                  <EditButton onclick={() => handleEditTodo(index)} />
                  <DeleteButton onclick={() => handleDeleteTodo(index)} />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
