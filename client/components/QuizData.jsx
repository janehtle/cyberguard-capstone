import { useState, useEffect } from 'react';
import QuizHTML from '../components/QuizHTML';

export default function QuizData() {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchQuestions() {
			try {
				const response = await fetch('http://localhost:5000/api/response', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
				});
				const data = await response.json();
				setQuestions(data.listOfQuestions);
				setLoading(false);
			} catch (err) {
				console.log('Error fetching questions:', err);
				setLoading(false);
			}
		}

		fetchQuestions();
	}, []);

	if (loading) return <p>Loading questions...</p>;
	if (questions.length === 0) return <p>No questions available.</p>;

	return <QuizHTML questions={questions} />;
}
