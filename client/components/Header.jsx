import React from "react";
import "../styles/header.css";
import Placeholder from "../assets/mascot.png";
import { Link } from "react-router-dom";


export default function Header() {
    return (
        <header>
            <Link to="/"><img src={Placeholder} className="placeholder" alt="green bean" /></Link>

            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="/quizhome">Quiz</Link>
                </li>

                <li>
                    <Link to="/login">Log In</Link>
                </li>
            </ul>
        </header>
    )
}