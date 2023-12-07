import { useEffect, useState } from "react";
import axios from "axios";
import style from "./Task.module.css";

const Task = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    dueDate: "",
  });
  const [editedTask, setEditedTask] = useState({
    name: "",
    description: "",
    dueDate: "",
  });
  const [taskIdToEdit, setTaskIdToEdit] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8001/tasks/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const handleAdd = () => {
    setShowForm(true);
    setIsEdit(false);
    setNewTask({
      name: "",
      description: "",
      dueDate: "",
    });
  };

  const createTask = () => {
    axios
      .post("http://localhost:8001/tasks/task", newTask, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTasks([...tasks, response.data]);
        setShowForm(false);
        alert("Task Created Successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);
    setEditedTask({
      name: taskToEdit.name,
      description: taskToEdit.description,
      dueDate: taskToEdit.dueDate,
    });
    setIsEdit(true);
    setTaskIdToEdit(taskId);
  };

  const saveEditedTask = () => {
    axios
      .put(`http://localhost:8001/tasks/${taskIdToEdit}`, editedTask, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const updatedTasks = tasks.map((task) =>
          task._id === taskIdToEdit ? response.data : task
        );
        setTasks(updatedTasks);
        setTaskIdToEdit(null);
        setIsEdit(false);
        setEditedTask({
          name: "",
          description: "",
          dueDate: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const cancelEdit = () => {
    setTaskIdToEdit(null);
    setIsEdit(false);
    setEditedTask({
      name: "",
      description: "",
      dueDate: "",
    });
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:8001/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        const filteredTasks = tasks.filter((task) => task._id !== id);
        setTasks(filteredTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className={style.cont}>
        <div className="col-12 text-end">
          <button className="btn btn-primary" onClick={handleAdd}>
            Add New Task
          </button>
        </div>
      </div>
      {showForm || isEdit ? (
        <div className="container border rounded shadow p-3 mb-5 bg-white rounded">
          <h4 style={{ textAlign: "center" }}>
            {isEdit ? "Edit Task" : "Add Task"}
          </h4>
          <br />
          <div className={style.form}>
            <label htmlFor="title" style={{ display: "block" }}>
              Enter Title{" "}
            </label>
            <input
              type="text"
              id="title"
              placeholder="Name"
              value={isEdit ? editedTask.name : newTask.name}
              onChange={(e) =>
                isEdit
                  ? setEditedTask({ ...editedTask, name: e.target.value })
                  : setNewTask({ ...newTask, name: e.target.value })
              }
            />
            <label htmlFor="description" style={{ display: "block" }}>
              Description{" "}
            </label>
            <input
              type="text"
              id="description"
              placeholder="Enter Description"
              value={isEdit ? editedTask.description : newTask.description}
              onChange={(e) =>
                isEdit
                  ? setEditedTask({
                      ...editedTask,
                      description: e.target.value,
                    })
                  : setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <label htmlFor="date" style={{ display: "block" }}>
              Due Date{" "}
            </label>
            <input
              type="date"
              id="date"
              value={isEdit ? editedTask.dueDate : newTask.dueDate}
              onChange={(e) =>
                isEdit
                  ? setEditedTask({ ...editedTask, dueDate: e.target.value })
                  : setNewTask({ ...newTask, dueDate: e.target.value })
              }
            />
            <br />
            {isEdit ? (
              <div>
                <button className={style.btns} onClick={saveEditedTask}>
                  Save
                </button>
                <button className={style.btns} onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            ) : (
              <button className={style.addBtn} onClick={createTask}>
                Create Task
              </button>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      {tasks.map((item) => (
        <div key={item.id} className={style.listCont}>
          <div className={style.list}>
            <h5>{item.name}</h5>
            <p>{item.description}</p>
            {/* <p>{item.dueDate}</p> */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                className={style.delbtn}
                onClick={() => deleteTask(item._id)}
              >
                Delete
              </button>
              <button
                className={style.editbtn}
                onClick={() => editTask(item._id)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Task;
