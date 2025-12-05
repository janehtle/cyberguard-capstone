import { useState, useEffect } from 'react';
import '../styles/quizhtml.css';

export default function QuizHTML({ questions, theme }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [userScore, setScore] = useState(0);
	const [selectedOption, setSelectedOption] = useState(null);
	const [showResult, setShowResult] = useState(false);

	const currentQuestion = questions?.[currentIndex] || {};
	const API_URL =
		import.meta.env.MODE === 'development' ? 'http://localhost:5000' : 'https://cyberguard-capstone.onrender.com';

	const PushData = async () => {
		try {
			const payload = {
				theme,
				score: userScore,
				correct_answers: userScore,
				incorrect_answers: questions.length - userScore,
				answers: [],
			};

			const token = localStorage.getItem('token');
			const headers = { 'Content-Type': 'application/json' };
			if (token) headers['Authorization'] = `Bearer ${token}`;

			const response = await fetch(`${API_URL}/api/quiz/submit`, {
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
			console.log('Pushed quiz data result:', result);
		} catch (err) {
			console.error('PushData error:', err);
		}
	};

	const handleOptionClick = (index) => {
		if (selectedOption !== null) return; // disable further clicks
		setSelectedOption(index);

		if (index === currentQuestion.correctAnswer) {
			setScore((prev) => prev + 1);
		}
	};

	const handleNext = () => {
		if (selectedOption === null) {
			alert('Please select an answer first!');
			return;
		}

		if (currentIndex + 1 < questions.length) {
			setCurrentIndex((prev) => prev + 1);
			setSelectedOption(null);
		} else {
			setShowResult(true);
		}
	};

	useEffect(() => {
		if (showResult) PushData();
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
		<div className="quizDiv">
			<h3 className="question">
				Question {currentIndex + 1}: {currentQuestion.question}
			</h3>

			<ul className="answers" style={{ listStyle: 'none', padding: 0 }}>
				{currentQuestion.options?.map((option, i) => (
					<li
						key={i}
						className="answer"
						onClick={() => handleOptionClick(i)}
						style={{
							backgroundColor:
								selectedOption === i ? (i === currentQuestion.correctAnswer ? 'lightgreen' : 'salmon') : '#f0f0f0',
							cursor: selectedOption === null ? 'pointer' : 'default',
						}}
					>
						{option}
					</li>
				))}
			</ul>

			<button onClick={handleNext} className="nextBtn">
				Next
			</button>
		</div>
	);
}
