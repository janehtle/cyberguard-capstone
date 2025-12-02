import { useState } from 'react';
import QuizButton from './QuizButton';
import QuizData from './QuizData';
export default function QuizChoiceSelect() {
	const [quizChoice, selectQuizChoice] = useState('');
	const [submit, submitted] = useState(false);
	const quizTopics = [
		'Phishing and social engineering',
		'Password security and authentication',
		'Safe browsing and website security',
		'Social media safety',
		'Financial and scam awareness',
		'Gaming and online chat',
		'Device and personal data protection',
	];

	//Can add num of questions as a addition option

	//Changes the state of the choice of the quiz
	function handleClick(value) {
		selectQuizChoice(value);
	}
	//sends data to the backend
	async function handleSubmit() {
		try {
			const response = await fetch('http://localhost:3000/api/response', {
				method: 'Post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ theme: quizChoice }),
			});
			console.log(submit);
			const result = await response.json();
			console.log('Server response:', result);
			submitted(true);
		} catch (err) {
			console.log(`Error ${err}`);
		}
	}

	if (submit === true) {
		return <QuizData />;
	} else {
		return (
			<>
				<h2>Select a quiz choice</h2>
				{quizTopics.map((choice) => (
					<QuizButton key={choice} value={choice} onClick={handleClick} />
				))}
				<h3>Current choice is {quizChoice}</h3>
				<button onClick={handleSubmit}>Submit</button>
			</>
		);
	}
}
