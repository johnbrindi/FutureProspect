import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api.js'; // Import your API service
import './studentLogin.css'; 


const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password });
    //   const User = response.data.N_user; // Access the N_user object
      console.log('Login Response:', response); // Log the response

      alert('Login successful: ' + response.N_user.firstname);
      // Redirect to the dashboard
            // Navigate to the dashboard with the first name
        navigate('/StudentDashboard', { state: { userName: response.N_user.firstname || 'User' } });
    } catch (error) {
      console.error(error);
      setError('Login failed: ' + (error.response?.data?.message || 'Invalid Email or Password!'));
    }
  };

  return (
    <div className="login-container">
      <h2>Student Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <div className="register-link">
          Don't have an account? <Link to="/">Register here</Link>
        </div>
      </form>
    </div>
  );
};

export default StudentLogin;