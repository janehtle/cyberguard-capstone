import { useState, useEffect } from 'react';
import QuizHTML from '../components/QuizHTML';

export default function QuizData({ theme }) {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);

	const API_URL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		if (!theme) return;

		async function fetchQuestions() {
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
			} finally {
				setLoading(false);
			}
		}

		fetchQuestions();
	}, [theme, API_URL]);

	if (loading) return <p>Loading questions...</p>;
	if (questions.length === 0) return <p>No questions available for this topic.</p>;

	return <QuizHTML questions={questions} theme={theme} />;
}
