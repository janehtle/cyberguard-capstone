import { useState, useEffect } from 'react';
import QuizHTML from '../components/QuizHTML';

export default function QuizData({ theme }) {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	// If VITE_API_URL is not set (monorepo / single-server), default to same-origin
	const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

	useEffect(() => {
		if (!theme) return;

		const fetchQuestions = async () => {
			setLoading(true);
			setError('');

			try {
				const response = await fetch(`${API_URL}/api/response`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ theme }),
				});

				if (!response.ok) {
					const text = await response.text();
					throw new Error(`Failed to fetch questions: ${text}`);
				}

				const data = await response.json();
				setQuestions(data.listOfQuestions || []);
			} catch (err) {
				console.error('Error fetching questions:', err);
				setError('Failed to load questions. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchQuestions();
	}, [theme, API_URL]);

	if (loading) return <p>Loading questions...</p>;
	if (error) return <p>{error}</p>;
	if (questions.length === 0) return <p>No questions available for this topic.</p>;

	return <QuizHTML questions={questions} theme={theme} />;
}
