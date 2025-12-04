import React, { useState, useEffect } from "react";
import "../styles/admin.css";

const AdminDashboard = () => {
  const yourAuthToken = "TEST_TOKEN";

  // ===== REAL STATE (only one declaration each) =====
  const [recentAttempts, setRecentAttempts] = useState([]);
  const [users, setUsers] = useState([]);
  const [topicData, setTopicData] = useState([]);

  // ===== LOAD DATA ON MOUNT =====
  useEffect(() => {
    // Remove backend code until connected
    loadDemoData();
  }, []);

  // ===== TEMP DEMO DATA =====
  const loadDemoData = () => {
    setRecentAttempts([
      {
        id: 1,
        userId: 101,
        user: "John Doe",
        quizTitle: "JavaScript Basics",
        score: 85,
        dateCompleted: "2024-11-28",
        weakAreas: "Closures, Promises",
      },
      {
        id: 2,
        userId: 102,
        user: "Jane Smith",
        quizTitle: "React Fundamentals",
        score: 92,
        dateCompleted: "2024-11-27",
        weakAreas: "Hooks",
      },
      {
        id: 3,
        userId: 103,
        user: "Mike Johnson",
        quizTitle: "CSS Advanced",
        score: 78,
        dateCompleted: "2024-11-26",
        weakAreas: "Grid, Flexbox",
      },
    ]);

    setUsers([
      {
        id: 101,
        name: "John Doe",
        email: "john@example.com",
        joinDate: "2024-01-15",
        quizzesTaken: 12,
      },
      {
        id: 102,
        name: "Jane Smith",
        email: "jane@example.com",
        joinDate: "2024-02-20",
        quizzesTaken: 8,
      },
      {
        id: 103,
        name: "Mike Johnson",
        email: "mike@example.com",
        joinDate: "2024-03-10",
        quizzesTaken: 15,
      },
      {
        id: 104,
        name: "Sarah Williams",
        email: "sarah@example.com",
        joinDate: "2024-04-05",
        quizzesTaken: 6,
      },
    ]);

    setTopicData([
      { topic: "JavaScript", attempts: 145, avgScore: 82 },
      { topic: "React", attempts: 98, avgScore: 88 },
      { topic: "CSS", attempts: 87, avgScore: 75 },
      { topic: "Node.js", attempts: 62, avgScore: 79 },
    ]);
  };

  // ===== DELETE USER =====
  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== userId));
      alert("User deleted (Demo mode)");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="admin-container">
        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">1,247</div>
            <div className="stat-label">Total Quizzes Taken</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">84.2%</div>
            <div className="stat-label">Average Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">356</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">12</div>
            <div className="stat-label">Active Topics</div>
          </div>
        </div>

        <div className="content-grid">
          {/* Recent Attempts */}
          <div className="content-section">
            <h2>Recent Quiz Attempts</h2>

            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Quiz</th>
                  <th>Score</th>
                  <th>Date</th>
                  <th>Weak Areas</th>
                </tr>
              </thead>
              <tbody>
                {recentAttempts.map((attempt) => (
                  <tr key={attempt.id}>
                    <td>{attempt.user}</td>
                    <td>{attempt.quizTitle}</td>
                    <td>{attempt.score}%</td>
                    <td>{attempt.dateCompleted}</td>
                    <td>{attempt.weakAreas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Topic Data */}
          <div className="sidebar-section">
            <h2>Overall Topic Data</h2>

            {topicData.map((topic, index) => (
              <div className="topic-card" key={index}>
                <div className="topic-name">{topic.topic}</div>
                <div className="topic-stats">
                  <span>{topic.attempts} attempts</span>
                  <span>Avg: {topic.avgScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Table */}
        <div className="user-management-section">
          <h2>User Management</h2>

          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Join Date</th>
                <th>Quizzes Taken</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.joinDate}</td>
                  <td>{u.quizzesTaken}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
