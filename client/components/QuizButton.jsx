export default function QuizButton({ value, onClick, className }) {
	return (
		<button className={className} onClick={() => onClick(value)}>
			{value}
		</button>
	);
}
