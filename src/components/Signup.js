import React, { useState } from 'react';
import './Signup.css';
import VaccineDataServices from './services/vaccines';
import { Link } from 'react-router-dom';
const Signup = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    rePassword: '',
  });

  const [error, setError] = useState('');
  const { username, email, password, rePassword } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      username.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      rePassword.trim() === ''
    ) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== rePassword) {
      setError('Passwords do not match');
      return;
    }
    const obj = {
      username: formData.username,
      pass1: formData.password,
      pass2: formData.rePassword,
      email: formData.email,
    };
    VaccineDataServices.userSignup(obj).then((data) => {
      if (data.data.acknowledged) {
        setError('User created successfully.. Login to proceed');
        setFormData({
          username: '',
          email: '',
          password: '',
          rePassword: '',
        });
      } else {
        setError(data.data.message);
      }
    });
  };

  const handleSubmitforadmin = (e) => {
    e.preventDefault();
    if (
      username.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      rePassword.trim() === ''
    ) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== rePassword) {
      setError('Passwords do not match');
      return;
    }
    const obj = {
      username: formData.username,
      pass1: formData.password,
      pass2: formData.rePassword,
      email: formData.email,
    };
    VaccineDataServices.adminSignup(obj).then((data) => {
      if (data.data.acknowledged) {
        setError('Admin User created successfully.. Login to proceed');
        setFormData({
          username: '',
          email: '',
          password: '',
          rePassword: '',
        });
      } else {
        setError(data.data.message);
      }
    });
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Re-enter Password</label>
          <input
            type="password"
            name="rePassword"
            value={rePassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign Up</button>
        <br></br>
        <button type="submit" onClick={handleSubmitforadmin}>
          Admin Sign Up
        </button>
      </form>
      <Link to="/" className="home-link">
        Go to Home
      </Link>
      {error && <p className="error">{error}</p>}
    </div>
  );
};
export default Signup;
