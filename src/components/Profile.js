import React, { useState, useEffect } from "react";
import "./Profile.css";
import profileImage from "../assets/Images/360_F_180045614_wUikfPv1VhpukGYtUBDfA2sGggXXJmQ5.jpg";

function Profile() {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskType, setNewTaskType] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60 * 24); // Update once per day

    return () => clearInterval(timer);
  }, []);

  const dayOfWeek = currentDate.toLocaleString("en-US", { weekday: "short" });
  const formattedDate = currentDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const personalTaskCount = tasks.filter(
    (task) => task.type === "Personal"
  ).length;
  const businessTaskCount = tasks.filter(
    (task) => task.type === "Business"
  ).length;

  const handleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit && !taskToEdit.completed) {
      setEditingTaskId(taskId);
      setEditingTaskName(taskToEdit.name);
    }
  };

  const handleSaveEdit = (taskId) => {
    if (editingTaskName.trim() !== "") {
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, name: editingTaskName.trim() } : task
        )
      );
      setEditingTaskId(null);
      setEditingTaskName("");
    }
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleAddTask = () => {
    if (newTaskName && newTaskType) {
      const newTask = {
        id: tasks.length + 1,
        name: newTaskName,
        type: newTaskType,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskName("");
      setNewTaskType("");
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Main">
      <div className="container">
        <img className="image" src={profileImage} alt="Profile" />
        <div class="overlay"></div>
        <div class="content">
          <div className="day-time">
            <div className="day">{dayOfWeek}</div>
            <div className="date">{formattedDate}</div>
          </div>
          <div className="tasks">
            <div className="tasks-1">
              <span className="task-count">{personalTaskCount}</span>
              <span className="task-label">Personal</span>
            </div>
            <div className="tasks-1">
              <span className="task-count">{businessTaskCount}</span>
              <span className="task-label">Business</span>
            </div>
          </div>
        </div>
      </div>
      <div className="search-div">
        <input
          type="text"
          className="search"
          placeholder="Search Task..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="task-list">
        {filteredTasks.map((task) => (
          <div key={task.id} className="task-item">
            <div className="task-group">
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editingTaskName}
                  onChange={(e) => setEditingTaskName(e.target.value)}
                  onBlur={() => handleSaveEdit(task.id)}
                  autoFocus
                  className="edit-input"
                />
              ) : (
                <span
                  className={`task-name ${task.completed ? "completed" : ""}`}
                >
                  {task.name}
                </span>
              )}
              <span
                className={`task-type ${task.completed ? "completed" : ""}`}
              >
                {task.type}
              </span>
            </div>
            <div className="task-actions">
              <button onClick={() => handleDelete(task.id)}>Delete</button>
              {editingTaskId === task.id ? (
                <button onClick={() => handleSaveEdit(task.id)}>Save</button>
              ) : (
                <button
                  onClick={() => handleEdit(task.id)}
                  disabled={task.completed}
                  className={`${task.completed ? "completed" : ""}`}
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleComplete(task.id)}
                disabled={task.completed}
                className={`${
                  task.completed ? "btn-comp completed" : "btn-comp"
                }`}
              >
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="add-task">
        <input
          type="text"
          className="Add"
          placeholder="Add a Task"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <select
          value={newTaskType}
          onChange={(e) => setNewTaskType(e.target.value)}
        >
          <option value="">Type</option>
          <option value="Personal">Personal</option>
          <option value="Business">Business</option>
        </select>
        <button className="add-btn" onClick={handleAddTask}>
          Add
        </button>
      </div>
    </div>
  );
}

export default Profile;
