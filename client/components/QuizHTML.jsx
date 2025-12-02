import { useState, useEffect } from 'react';
import '../styles/quizhtml.css';

export default function QuizHTML({ questions }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [userScore, setScore] = useState(0);
	const [selectedOption, setSelectedOption] = useState(null);
	const [showResult, setShowResult] = useState(false);

	const currentQuestion = questions[currentIndex];

	async function PushData() {
		try {
			const response = await fetch('http://localhost:5000/api/quiz', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ score: userScore }),
			});
			const result = await response.json();
			console.log(`Pushing data ${result}`);
		} catch (err) {
			console.log(`Error ${err}`);
		}
	}

	const handleOptionClick = (index) => {
		setSelectedOption(index);

		//Checks to see if the index of the option matches the currect question index
		if (index === currentQuestion.correctAnswer) {
			setScore((prev) => prev + 1);
		}
		// Show result briefly before moving to next
		setTimeout(() => {
			if (currentIndex + 1 < questions.length) {
				setCurrentIndex(currentIndex + 1);
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
					Your Score: {score} / {questions.length}
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
				{/* <button onClick={<Route path="/quizhome" element={<Quiz />} />}>Change Topics</button> */}
			</div>
		);
	}

	return (
		<div style={{ marginBottom: '20px' }} className="quizDiv">
			<h3 className="question">
				Question {currentIndex + 1}: {currentQuestion.question}
			</h3>

			<ul style={{ listStyle: 'none', padding: 0 }} className="answers">
				{currentQuestion.options.map((option, i) => (
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
