import { useState, useEffect } from 'react';
import QuizHTML from '../components/QuizHTML';

export default function QuizData({ theme }) {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchQuestions() {
			try {
				const response = await fetch('/api/response', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ theme }),
				});
				const data = await response.json();
				setQuestions(data.listOfQuestions || []);
				setLoading(false);
			} catch (err) {
				console.log('Error fetching questions:', err);
				setLoading(false);
			}
		}

		fetchQuestions();
	}, [theme]);

	if (loading) return <p>Loading questions...</p>;
	if (questions.length === 0) return <p>No questions available.</p>;

	return <QuizHTML questions={questions} theme={theme} />;
}
