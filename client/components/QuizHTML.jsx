import { useState } from 'react';

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
