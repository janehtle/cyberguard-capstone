import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';
import { AuthContext } from '../components/AuthConext'; // make sure path is correct

export default function Login() {
	const navigate = useNavigate();
	const { login } = useContext(AuthContext); // ✅ use login from context
	const DB_URL = import.meta.env.DB_URL || 'http://localhost:5000';
	const [formData, setFormData] = useState({ email: '', password: '' });

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`${DB_URL}/api/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ email: formData.email, password: formData.password }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data?.msg || data?.error || 'Login failed');
			}

			// ✅ Save token if present
			if (data.token) localStorage.setItem('token', data.token);

			// ✅ Update context and localStorage
			if (data.user) {
				login(data.user); // THIS triggers Header to re-render
			}

			navigate('/'); // redirect after login
		} catch (err) {
			console.error('Login error:', err);
			alert(err.message || 'Login failed');
		}
	};

	return (
		<div className="login-page">
			<div className="login-card">
				<h1 className="login-title">Sign In</h1>
				<p className="login-subtitle">Welcome back to CyberGuard</p>

				<form className="login-form" onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Enter your email"
							autoComplete="email"
							required
						/>
					</div>

					<div className="form-group">
						<label>Password</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="Enter your password"
							autoComplete="current-password"
							required
						/>
					</div>

					<button type="submit" className="login-btn">
						Sign In
					</button>
				</form>

				<p className="login-footer">
					Don't have an account? <Link to="/signup">Sign up</Link>
				</p>
			</div>
		</div>
	);
}
