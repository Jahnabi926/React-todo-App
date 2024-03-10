import "./App.css";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

function App() {
  const [isCompleteScreen, setisCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const handleAddTodo = () => {
    if (newTitle && newDescription) {
      let newTodo = {
        title: newTitle,
        description: newDescription,
      };
      let updatedArr = [...allTodos];
      updatedArr.push(newTodo);
      setTodos(updatedArr);
      localStorage.setItem("todoList", JSON.stringify(updatedArr));
      setNewTitle("");
      setNewDescription("");
    }
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleCompletedTodo = (index) => {
    const now = new Date();
    const dd = now.getDate();
    const mm = now.getMonth();
    const yyyy = now.getFullYear();
    const hr = now.getHours();
    const min = now.getMinutes();
    const s = now.getSeconds();
    const completedOn =
      dd + "-" + mm + "-" + yyyy + " at " + hr + "-" + min + "-" + s;
    const filteredTodo = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    const completedTodoArr = [...completedTodos];
    completedTodoArr.push(filteredTodo);
    setCompletedTodos(completedTodoArr);
    localStorage.setItem("completedList", JSON.stringify(completedTodoArr));
    handleDeleteTodo(index);
  };

  const handleDeleteCompletedTodo = (index) => {
    let reducedCompletedTodo = [...completedTodos];
    reducedCompletedTodo.splice(index, 1);
    localStorage.setItem("completedList", JSON.stringify(reducedCompletedTodo));
    setCompletedTodos(reducedCompletedTodo);
  };

  const handleEditTodo = (index) => {
    setCurrentEdit(index);
  };

  const handleUpdateTodo = () => {
    if (updatedTitle && updatedDescription) {
      let updatedTodo = {
        title: updatedTitle,
        description: updatedDescription,
      };
      let updatedTodoArr = [...allTodos];
      updatedTodoArr[currentEdit] = updatedTodo;
      setTodos(updatedTodoArr);
      setCurrentEdit(null);
      localStorage.setItem("editedList", JSON.stringify(updatedTodoArr));
    }
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todoList"));
    if (savedTodo) {
      setTodos(savedTodo);
    }

    let savedcompletedTodo = JSON.parse(localStorage.getItem("completedList"));
    if (savedcompletedTodo) {
      setCompletedTodos(savedcompletedTodo);
    }

    let savedEditedTodo = JSON.parse(localStorage.getItem("editedList"));
    if (savedEditedTodo) {
      setTodos(savedEditedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1> React To Do App</h1>{" "}
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              placeholder="What's the task title?"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              placeholder="What's the task description?"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              className="primaryBtn"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setisCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setisCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              if (currentEdit === index) {
                return (
                  <div className="edit-wrapper" key={index}>
                    <input
                      type="text"
                      placeholder="Updated title"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                    <textarea
                      placeholder="Updated description"
                      name="Updated description"
                      rows="4"
                      value={updatedDescription}
                      onChange={(e) => setUpdatedDescription(e.target.value)}
                    />
                    <button
                      type="button"
                      className="primaryBtn"
                      onClick={handleUpdateTodo}
                    >
                      Update
                    </button>
                  </div>
                );
              } else {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      {" "}
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div className="icons">
                      <MdDelete
                        className="delete-icon"
                        title="Delete?"
                        onClick={() => handleDeleteTodo(index)}
                      />
                      <FaCheck
                        className="check-icon"
                        title="Completed?"
                        onClick={() => handleCompletedTodo(index)}
                      />
                      <MdEdit
                        className="edit-icon"
                        title="Edit?"
                        onClick={() => handleEditTodo(index)}
                      />
                    </div>
                  </div>
                );
              }
            })}

          {isCompleteScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    {" "}
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed on : {item.completedOn}</small>
                    </p>
                  </div>
                  <div className="icons">
                    <MdDelete
                      className="delete-icon"
                      title="Delete?"
                      onClick={() => handleDeleteCompletedTodo(index)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
