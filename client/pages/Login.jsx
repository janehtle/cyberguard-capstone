import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';

export default function Login() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ email: '', password: '' });

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// POST to backend to login
		fetch('/api/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: formData.email, password: formData.password }),
		})
			.then(async (res) => {
				const data = await res.json();
				if (!res.ok) throw new Error(data.msg || data.error || 'Login failed');
				// Store token and user
				if (data.token) {
					localStorage.setItem('token', data.token);
				}
				if (data.user) {
					localStorage.setItem('user', JSON.stringify(data.user));
				}
				navigate('/');
			})
			.catch((err) => {
				console.error('Login error:', err);
				// Show brief error to user
				alert(err.message || 'Login failed');
			});
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

					<div className="form-extras">
						<label className="remember-me">
							<input type="checkbox" />
							<span>Remember me</span>
						</label>
						<Link to="/forgot-password" className="forgot-link">
							Forgot password?
						</Link>
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
