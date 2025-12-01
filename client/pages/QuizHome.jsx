import Brain from "../assets/brain-removebg.png";
import "../styles/quizhome.css";

export default function QuizHome() {
    return (
        <main>
            <img src={Brain} className="brainImg" alt="brain image" />

            <h2 className="mainText">Test your Cybersecurity knowledge with real-world scenarios and principles!</h2>
            <button className="startBtn">Start Quiz</button>
        </main>
    )
} 