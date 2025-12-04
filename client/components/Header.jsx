import React from 'react';
import '../styles/header.css';
import Logo from '../assets/logo-removebg.png';
import { Link } from 'react-router-dom';

export default function Header() {
	return (
		<header>
			<Link to="/">
				<img src={Logo} className="logo" alt="cyberguard logo" />
			</Link>

			<ul className="nav-links">
				<li>
					<Link to="/">Home</Link>
				</li>

				<li>
					<Link to="/quizhome">Quiz</Link>
				</li>

				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/admin">Admin</Link>
				</li>
			</ul>
		</header>
	);
}
