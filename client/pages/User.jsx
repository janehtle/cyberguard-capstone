import '../styles/user.css';
import React, { useState, useEffect } from 'react';

export default function User() {
	const [user, setUser] = useState(null);
	const [quizHistory, setQuizHistory] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Use VITE_API_URL if set (production), otherwise default to empty string (same origin)
	const API_URL = import.meta.env.VITE_API_URL || '';

	// Load user from localStorage on mount
	useEffect(() => {
		try {
			const raw = localStorage.getItem('user');
			const userData = raw ? JSON.parse(raw) : null;
			setUser(userData);
		} catch (err) {
			console.error('Failed to parse user from localStorage:', err);
			setUser(null);
		}
	}, []);

	// Fetch quiz history when user is available
	useEffect(() => {
		const fetchQuizHistory = async () => {
			if (!user) {
				setLoading(false);
				return;
			}

			try {
				const token = localStorage.getItem('token');
				if (!token) {
					throw new Error('No authentication token found');
				}

				const fetchUrl = `${API_URL}/api/quiz/history/${user.id}`;
				console.log('📊 Fetching quiz history from:', fetchUrl);

				const res = await fetch(fetchUrl, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				if (!res.ok) {
					const text = await res.text();
					console.error('API response:', res.status, text);
					throw new Error(`Failed to fetch quiz history (${res.status})`);
				}

				const data = await res.json();
				setQuizHistory(data.quizHistory || data || []);
				setError(null);
			} catch (err) {
				console.error('Error fetching quiz history:', err);
				setError(err.message || 'An error occurred while loading your quiz history');
				setQuizHistory([]);
			} finally {
				setLoading(false);
			}
		};

		fetchQuizHistory();
	}, [user, API_URL]);

	if (!user) return <p>Please log in to view your dashboard.</p>;
	if (loading) return <p>Loading your quiz history...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="dashboard-container">
			<h1 className="dashboard-greeting">Welcome back, {user.username}!</h1>

			<div className="dashboard-table-wrapper">
				<table className="dashboard-table">
					<thead>
						<tr>
							<th>Attempt</th>
							<th>Score</th>
							<th>Correct</th>
							<th>Incorrect</th>
							<th>Date Taken</th>
							<th>Topic</th>
						</tr>
					</thead>

					<tbody>
						{quizHistory.length > 0 ? (
							quizHistory.map((attempt) => (
								<tr key={attempt.id}>
									<td>{attempt.id}</td>
									<td>{attempt.score}%</td>
									<td>{attempt.correct_answers}</td>
									<td>{attempt.incorrect_answers}</td>
									<td>{new Date(attempt.timestamp).toLocaleDateString()}</td>
									<td>{attempt.theme}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="6" className="no-data">
									No quiz attempts found :(
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
