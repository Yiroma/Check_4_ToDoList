import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskDescription, setEditingTaskDescription] = useState("");

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
      description: newTask,
      completed: false,
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
      setNewTask(newTaskData.description);
    }
  };

  const updateTask = (id, completed) => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/${id}`, { completed })
      .then(() => {
        const updatedTasks = tasks.map((task) =>
          task.id === id ? { ...task, completed } : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editTask = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskDescription(task.description);
  };

  const saveEditedTask = (task) => {
    const updatedTask = {
      id: task.id,
      description: editingTaskDescription,
      completed: task.completed,
    };

    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/${task.id}`, updatedTask)
      .then(() => {
        setTasks(
          tasks.map((t) =>
            t.id === task.id ? { ...t, description: editingTaskDescription } : t
          )
        );
        setEditingTaskId(null);
        setEditingTaskDescription("");
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
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button type="button" onClick={addTask}>
        Add Task
      </button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => updateTask(task.id, e.target.checked)}
            />
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editingTaskDescription}
                  onChange={(e) => setEditingTaskDescription(e.target.value)}
                />
                <button type="button" onClick={() => saveEditedTask(task)}>
                  Save
                </button>
              </>
            ) : (
              <>
                {task.description}
                <button type="button" onClick={() => editTask(task)}>
                  Edit
                </button>
                <button type="button" onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
