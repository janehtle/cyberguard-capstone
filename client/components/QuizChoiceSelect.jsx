import { useState } from 'react';
import QuizButton from './QuizButton';
import QuizData from './QuizData';
import '../styles/quizchoice.css';

export default function QuizChoiceSelect() {
	const [quizChoice, setQuizChoice] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const quizTopics = [
		'Phishing and social engineering',
		'Password security and authentication',
		'Safe browsing and website security',
		'Social media safety',
		'Financial and scam awareness',
		'Gaming and online chat',
		'Device and personal data protection',
	];

	function handleClick(value) {
		setQuizChoice(value);
	}

	function handleSubmit() {
		if (!quizChoice) {
			alert('Please select a quiz topic!');
			return;
		}
		setSubmitted(true);
	}

	if (submitted) {
		return <QuizData theme={quizChoice} />;
	}

	return (
		<div>
			<h2>Select a quiz choice</h2>
			{quizTopics.map((choice) => (
				<QuizButton key={choice} value={choice} onClick={handleClick} className="quizBtn" />
			))}
			<h3>Current choice: {quizChoice}</h3>
			<button onClick={handleSubmit} className="submitBtn">
				Submit
			</button>
		</div>
	);
}
