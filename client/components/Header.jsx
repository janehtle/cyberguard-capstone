import React, { useContext } from 'react';
import '../styles/header.css';
import Logo from '../assets/logo-removebg.png';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthConext'; // <-- make sure this path matches your file

export default function Header() {
	const { user, logout } = useContext(AuthContext);

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

				{!user && (
					<>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/signup">Signup</Link>
						</li>
					</>
				)}

				{user && (
					<>
						<li>
							<Link to="/userdashboard">Dashboard</Link>
						</li>
						{user.role === 'admin' && (
							<li>
								<Link to="/admin">Admin</Link>
							</li>
						)}
						<li>
							<button onClick={logout}>Logout</button>
						</li>
					</>
				)}
			</ul>
		</header>
	);
}
