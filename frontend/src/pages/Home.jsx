import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import Header from "../components/Header";
import Footer from "../components/Footer";

import Edit from "../assets/edit.svg";
import Delete from "../assets/delete.svg";
import Add from "../assets/add.svg";
import Checked from "../assets/checked.svg";
import Save from "../assets/save.svg";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskDesc, setEditingTaskDesc] = useState("");

  const fetchTasks = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    const newTaskData = {
      id: uuidv4(),
      desc: newTask,
      checked: false,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}`,
        newTaskData
      );
      setTasks([
        ...tasks.filter((task) => task.id !== newTaskData.id),
        response.data,
      ]);
      setTasks([...tasks, newTaskData]);
      setNewTask("");
    } catch (error) {
      console.error(error);
      setTasks(tasks.filter((task) => task.id !== newTaskData.id));
      setNewTask(newTaskData.desc);
    }
  };

  const updateTaskStatus = (id, checked) => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/${id}`, { checked: !checked })
      .then(() => {
        const updatedTasks = tasks.map((task) =>
          task.id === id ? { ...task, checked: !checked } : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editTask = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskDesc(task.desc);
  };

  const saveEditedTask = (task) => {
    const updatedTask = {
      id: task.id,
      desc: editingTaskDesc,
      checked: task.checked,
    };

    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/${task.id}`, updatedTask)
      .then(() => {
        setTasks(
          tasks.map((t) =>
            t.id === task.id ? { ...t, desc: editingTaskDesc } : t
          )
        );
        setEditingTaskId(null);
        setEditingTaskDesc("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/${id}`)
      .then(() => {
        const filteredTasks = tasks.filter((task) => task.id !== id);
        setTasks(filteredTasks);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="home">
      <Header />
      <div className="addTaskContainer">
        <input
          type="text"
          value={newTask}
          placeholder="Ajouter une tache"
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="button" onClick={addTask}>
          <img src={Add} alt="addTask" />
        </button>
      </div>

      <ul className="taskContainer">
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              backgroundColor: task.checked ? "#e7e7e780" : "#ffffff99",
              color: task.checked ? "#a5a5a5" : "inherit",
            }}
          >
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editingTaskDesc}
                  onChange={(e) => setEditingTaskDesc(e.target.value)}
                  style={{
                    backgroundColor: task.checked ? "#e7e7e780" : "#ffffff99",
                    color: task.checked ? "#a5a5a5" : "inherit",
                  }}
                />
                <div className="btnCheckSaveContainer">
                  <button
                    type="button"
                    onClick={() => updateTaskStatus(task.id, task.checked)}
                    style={{
                      backgroundColor: task.checked ? "#1ec41e9d" : "#ffffff99",
                    }}
                  >
                    <img className="imgChecked" src={Checked} alt="checked" />
                  </button>
                  <button type="button" onClick={() => saveEditedTask(task)}>
                    <img className="imgSave" src={Save} alt="save" />
                  </button>
                </div>
              </>
            ) : (
              <>
                {task.desc}
                <div className="btnEditDeleteContainer">
                  <button
                    className="btnEditDelete"
                    type="button"
                    style={{ display: task.checked ? "block" : "none" }}
                  >
                    <img className="imgChecked" src={Checked} alt="checked" />
                  </button>
                  <button
                    className="btnEditDelete"
                    type="button"
                    onClick={() => editTask(task)}
                  >
                    <img src={Edit} alt="edit" />
                  </button>
                  <button
                    className="btnEditDelete"
                    type="button"
                    onClick={() => deleteTask(task.id)}
                  >
                    <img src={Delete} alt="delete" />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export default Home;
