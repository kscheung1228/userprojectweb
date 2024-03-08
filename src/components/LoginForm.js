import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
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
        const response = await axios.post('http://127.0.0.1:8000/dj-rest-auth/login/', formData);
        console.log (response.data)
        // Handle the response, e.g., store the JWT token in local storage or state
        localStorage.setItem('token', response.data.token); // Store the JWT token in local storage
        // Redirect to the dashboard or perform any other necessary action
      } catch (error) {
        // Handle the error, e.g., display an error message
      }
    };
  
    // Render the login form
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    );
  }
  
  export default LoginForm;