import "../styles/user.css";
import React from "react";

export default function User({ firstName, quizHistory }) {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-greeting">Welcome back, {firstName}!</h1>

            <div className="dashboard-table-wrapper">
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Attempt</th>
                            <th>Score</th>
                            <th>Correct</th>
                            <th>Incorrect</th>
                            <th>Date Taken</th>
                            <th>Topic</th>
                        </tr>
                    </thead>

                    <tbody>
                        {quizHistory && quizHistory.length > 0 ? (
                            quizHistory.map((attempt) => (
                                <tr key={attempt.id}>
                                    {/* attempt number = quiz_results.id */}
                                    <td>{attempt.id}</td>

                                    {/* score = quiz_results.score */}
                                    <td>{attempt.score}%</td>

                                    {/* correct_answers = quiz_results.correct_answers */}
                                    <td>{attempt.correct_answers}</td>

                                    {/* incorrect_answers = quiz_results.incorrect_answers */}
                                    <td>{attempt.incorrect_answers}</td>

                                    {/* timestamp = quiz_results.timestamp */}
                                    <td>
                                        {new Date(attempt.timestamp).toLocaleDateString()}
                                    </td>

                                    {/* topic (must come from backend join with questions.category) */}
                                    <td>{attempt.topic}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="no-data">No quiz attempts found :(</td>
                                {/* just ignore the open parentheses, shouldn't cause any issues */}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

