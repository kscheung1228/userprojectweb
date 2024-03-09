import React, { useState } from 'react';
import axios from 'axios';
import { setAuthToken, api } from './api';
import { LoginStatusChecker } from './LoginStatusChecker';



function LoginForm() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState();

    const [formData, setFormData] = useState({
      username: '',
      password: ''
    });


  
    // Handle form input changes
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Make a POST request to the login endpoint of your API to obtain the JWT token
        const response = await api.post('/dj-rest-auth/login/', formData);
        setMessage(response.data);
        setError('');
        // Handle the response, e.g., store the JWT token in local storage or state
        // localStorage.setItem('token', response.data.token); // Store the JWT token in local storage
        // Redirect to the dashboard or perform any other necessary action
        setAuthToken(response.data.access,response.data.refresh)
      } catch (error) {
        // Handle the error, e.g., display an error message
        console.error(error);
        setMessage('');
        setError(JSON.stringify(error.response.data));
      }
    };
  
    // Render the login form
    return (
      
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <button type="submit">Login</button>
        <div>
                {error && <p>{JSON.stringify(error)}</p>}
                {message && <p>{JSON.stringify(message)}</p>}
            </div>
      </form>
      
    );
  }
  
  export default LoginForm;