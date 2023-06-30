import React, { useState } from 'react';
import './Login.css'; // Import common CSS styles
import './UserLogin.css'; // Import user-specific CSS styles
import './AdminLogin.css'; // Import admin-specific CSS styles
import VaccineDataServices from './services/vaccines';
import { Link } from 'react-router-dom';
const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError('');
  };

  const handleTabSwitch = (adminLogin) => {
    setIsAdmin(adminLogin);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter both username and password.');
      return;
    }
    // Perform login logic here based on username, password, and isAdmin
    const requestBody = { username: username, password: password };
    if (!isAdmin) {
      VaccineDataServices.loginUser(requestBody).then((data) => {
        if (data.data.user) {
          props.setUser(data.data.user);
          setUsername('');
          setPassword('');
        } else {
          setError('Invalid user name and password');
        }
      });
    }
    if (isAdmin) {
      VaccineDataServices.adminLogin(requestBody).then((data) => {
        if (data.data) {
          props.setAdminUser(data.data);
          props.setisAdmin(true);
          setUsername('');
          setPassword('');
        } else {
          setError('Invalid user name and password');
        }
      });
    }
  };

  const loginHeaderText = isAdmin ? 'Admin Login' : 'User Login';

  return (
    <div className="login-container">
      <nav className="login-navbar">
        <button
          className={`tab-button ${!isAdmin ? 'active' : ''}`}
          onClick={() => handleTabSwitch(false)}
        >
          User Login
        </button>
        <button
          className={`tab-button ${isAdmin ? 'active' : ''}`}
          onClick={() => handleTabSwitch(true)}
        >
          Admin Login
        </button>
      </nav>
      <div className={`login ${isAdmin ? 'admin' : 'user'}`}>
        <h2>{loginHeaderText}</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <button type="submit">Login</button>
          {error && (
            <p
              className={`error-message ${
                isAdmin ? 'admin-error' : 'user-error'
              }`}
            >
              {error}
            </p>
          )}
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
