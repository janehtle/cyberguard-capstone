import { useState } from 'react';
import Brain from '../assets/brain-removebg.png';
import QuizChoiceSelect from '../components/QuizChoiceSelect';
import '../styles/quizhome.css';

export default function QuizHome() {
	const [start, setStart] = useState(false);

	if (start) {
		return <QuizChoiceSelect />;
	}

	return (
		<main>
			<img src={Brain} className="brainImg" alt="brain image" />

			<h2 className="mainText">Test your Cybersecurity knowledge with real-world scenarios and principles!</h2>

			<button onClick={() => setStart(true)} className="startBtn">
				Start Quiz
			</button>
		</main>
	);
}
