import { useState } from 'react';
import { href, Link } from 'react-router-dom';

export default function QuizHTML({ questions }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [selectedOption, setSelectedOption] = useState(null);
	const [showResult, setShowResult] = useState(false);

	const currentQuestion = questions[currentIndex];

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

	if (showResult) {
		return (
			<div>
				<h2>Quiz Completed!</h2>
				<p>
					Your Score: {score} / {questions.length}
				</p>
				<button
					onClick={() => {
						setCurrentIndex(0);
						setScore(0);
						setSelectedOption(null);
						setShowResult(false);
					}}
				>
					Restart Quiz
				</button>
				<button onClick={<Route path="/quizhome" element={<Quiz />} />}>Change Topics</button>
			</div>
		);
	}

	return (
		<div style={{ marginBottom: '20px' }}>
			<h3>
				Question {currentIndex + 1}: {currentQuestion.question}
			</h3>
			<ul style={{ listStyle: 'none', padding: 0 }}>
				{currentQuestion.options.map((option, i) => (
					<li
						key={i}
						onClick={() => handleOptionClick(i)}
						style={{
							backgroundColor:
								selectedOption === i ? (i === currentQuestion.correctAnswer ? 'lightgreen' : 'salmon') : '#f0f0f0',
							cursor: 'pointer',
						}}
					>
						{option}
					</li>
				))}
			</ul>
		</div>
	);
}
