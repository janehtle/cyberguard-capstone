import React, { useState, useEffect } from 'react';
import '../styles/admin.css';

const AdminDashboard = () => {
	const [recentAttempts, setRecentAttempts] = useState([]);
	const [users, setUsers] = useState([]);
	const [topicData, setTopicData] = useState([]);
	const [stats, setStats] = useState({
		totalQuizzesTaken: 0,
		averageScore: 0,
		totalUsers: 0,
		activeTopics: 0,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const API_URL = import.meta.env.VITE_API_URL || '';
	const token = localStorage.getItem('token');

	useEffect(() => {
		const fetchAdminData = async () => {
			if (!token) {
				setError('No authentication token found');
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				setError(null);

				const headers = {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				};

				// Fetch recent attempts
				const attemptsRes = await fetch(`${API_URL}/api/admin/recent-attempts`, { headers });
				const attemptsData = await attemptsRes.json();

				// Add correct score calculation
				const calculatedAttempts = (attemptsData.attempts || attemptsData || []).map((a) => {
					const correct = a.correct_answers || 0;
					const incorrect = a.incorrect_answers || 0;
					const total = correct + incorrect;

					const score = total > 0 ? Number(((correct / total) * 100).toFixed(1)) : 0;

					return { ...a, score };
				});

				setRecentAttempts(calculatedAttempts);

				// Fetch users
				const usersRes = await fetch(`${API_URL}/api/admin/users`, { headers });
				const usersData = await usersRes.json();
				setUsers(usersData.users || usersData || []);

				// Fetch topics
				const topicsRes = await fetch(`${API_URL}/api/admin/topics`, { headers });
				const topicsData = await topicsRes.json();
				setTopicData(topicsData.topics || topicsData || []);
			} catch (err) {
				console.error('Error fetching admin data:', err);
				setError(err.message || 'Failed to load admin data');
			} finally {
				setLoading(false);
			}
		};

		fetchAdminData();
	}, [API_URL, token]);

	// Compute stats dynamically
	useEffect(() => {
		const average =
			recentAttempts.length > 0
				? (recentAttempts.reduce((sum, a) => sum + (a.score || 0), 0) / recentAttempts.length).toFixed(1)
				: 0;

		setStats({
			totalQuizzesTaken: recentAttempts.length,
			averageScore: average,
			totalUsers: users.length,
			activeTopics: topicData.length,
		});
	}, [recentAttempts, users, topicData]);

	const handleDeleteUser = async (userId) => {
		if (!window.confirm('Are you sure you want to delete this user?')) return;

		try {
			const res = await fetch(`${API_URL}/api/admin/users/${userId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (res.ok) {
				setUsers(users.filter((u) => u.id !== userId));
				alert('User deleted successfully');
			} else {
				alert('Failed to delete user');
			}
		} catch (err) {
			console.error(err);
			alert('Error deleting user');
		}
	};

	if (loading) return <p>Loading admin data...</p>;
	if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

	return (
		<div className="admin-page">
			<div className="admin-header">
				<h1>Admin Dashboard</h1>
			</div>

			<div className="admin-container">
				{/* Stats */}
				<div className="stats-grid">
					<div className="stat-card">
						<div className="stat-value">{stats.totalQuizzesTaken}</div>
						<div className="stat-label">Total Quizzes Taken</div>
					</div>
					<div className="stat-card">
						<div className="stat-value">{stats.averageScore}%</div>
						<div className="stat-label">Average Score</div>
					</div>
					<div className="stat-card">
						<div className="stat-value">{stats.totalUsers}</div>
						<div className="stat-label">Total Users</div>
					</div>
					<div className="stat-card">
						<div className="stat-value">{stats.activeTopics}</div>
						<div className="stat-label">Active Topics</div>
					</div>
				</div>

				{/* Recent Attempts */}
				<div className="content-section">
					<h2>Recent Quiz Attempts</h2>
					<table className="data-table">
						<thead>
							<tr>
								<th>User</th>
								<th>Topic</th>
								<th>Score</th>
								<th>Date</th>
								<th>Correct / Incorrect</th>
							</tr>
						</thead>
						<tbody>
							{recentAttempts.length > 0 ? (
								recentAttempts.map((a) => (
									<tr key={a.id}>
										<td>{a.username || a.user || 'Unknown'}</td>
										<td>{a.theme || a.topic || 'N/A'}</td>
										<td>{a.score}%</td>
										<td>{a.timestamp ? new Date(a.timestamp).toLocaleDateString() : 'N/A'}</td>
										<td>
											{a.correct_answers || 0} / {a.incorrect_answers || 0}
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="5">No recent attempts found</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* Topic Overview */}
				<div className="sidebar-section">
					<h2>Overall Topic Data</h2>
					{topicData.length > 0 ? (
						topicData.map((t, idx) => (
							<div className="topic-card" key={idx}>
								<div className="topic-name">{t.topic || t.theme || 'Unknown'}</div>
								<div className="topic-stats">
									<span>{t.attempts || 0} attempts</span>
									<span>Avg: {t.avgScore || t.avg_score || 0}%</span>
								</div>
							</div>
						))
					) : (
						<p>No topic data available</p>
					)}
				</div>

				{/* User Management */}
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
							{users.length > 0 ? (
								users.map((u) => (
									<tr key={u.id}>
										<td>{u.username || u.name || 'Unknown'}</td>
										<td>{u.email || 'N/A'}</td>
										<td>{u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}</td>
										<td>{u.quizzesTaken || 0}</td>
										<td>
											<button onClick={() => handleDeleteUser(u.id)} className="delete-btn">
												Delete
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="5">No users found</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
