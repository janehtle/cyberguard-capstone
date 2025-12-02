import { useState, useEffect } from 'react';
import '../styles/quizhtml.css';

export default function QuizHTML({ questions }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [userScore, setScore] = useState(0);
	const [selectedOption, setSelectedOption] = useState(null);
	const [showResult, setShowResult] = useState(false);

	const currentQuestion = questions?.[currentIndex] || {};

	async function PushData() {
		try {
			const payload = {
				score: userScore,
				correct_answers: userScore,
				incorrect_answers: questions.length - userScore,
				answers: [],
			};

			// attach token if available (backend requires auth for /api/quiz routes)
			const token = localStorage.getItem('token');
			const headers = { 'Content-Type': 'application/json' };
			if (token) headers['Authorization'] = `Bearer ${token}`;

			const response = await fetch('http://localhost:5000/api/quiz/submit', {
				method: 'POST',
				headers,
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const text = await response.text();
				console.error('Failed to push quiz data:', response.status, text);
				return;
			}

			const result = await response.json();
			console.log('Pushing data result:', result);
		} catch (err) {
			console.error('PushData error:', err);
		}
	}

	const handleOptionClick = (index) => {
		setSelectedOption(index);

		// Check if selected index matches correct answer
		if (index === currentQuestion.correctAnswer) {
			setScore((prev) => prev + 1);
		}

		// Show result briefly before moving to next
		setTimeout(() => {
			if (currentIndex + 1 < questions.length) {
				setCurrentIndex((prev) => prev + 1);
				setSelectedOption(null);
			} else {
				setShowResult(true);
			}
		}, 500);
	};

	useEffect(() => {
		if (showResult) {
			PushData();
		}
	}, [showResult]);

	if (showResult) {
		return (
			<div>
				<h2 className="completion">Quiz Completed!</h2>
				<p className="score">
					Your Score: {userScore} / {questions.length}
				</p>
				<button
					className="restartBtn"
					onClick={() => {
						setCurrentIndex(0);
						setScore(0);
						setSelectedOption(null);
						setShowResult(false);
					}}
				>
					Restart Quiz
				</button>
			</div>
		);
	}

	return (
		<div style={{ marginBottom: '20px' }} className="quizDiv">
			<h3 className="question">
				Question {currentIndex + 1}: {currentQuestion.question}
			</h3>

			<ul style={{ listStyle: 'none', padding: 0 }} className="answers">
				{currentQuestion.options?.map((option, i) => (
					<li
						key={i}
						onClick={() => handleOptionClick(i)}
						style={{
							backgroundColor:
								selectedOption === i ? (i === currentQuestion.correctAnswer ? 'lightgreen' : 'salmon') : '#f0f0f0',
							cursor: 'pointer',
						}}
						className="answer"
					>
						{option}
					</li>
				))}
			</ul>
		</div>
	);
}
