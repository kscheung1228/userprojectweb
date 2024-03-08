import React, { useState } from 'react';
import axios from 'axios';

function RegistrationForm() {
    const [formData, setFormData] = useState({
      username: '',
      password1: '',
      password2: '',
      email: ''
    });

   
  
    // Handle form input changes
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Make a POST request to the registration endpoint of your API
        const response = await axios.post('http://127.0.0.1:8000/dj-rest-auth/registration/', formData);
  
        // Handle the response, e.g., display a success message or redirect to the login page
      } catch (error) {
        // Handle the error, e.g., display an error message
        console.log(error)
      }
    };
  
    // Render the registration form
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
        <input type="password" name="password1" value={formData.password1} onChange={handleChange} placeholder="Password1" />
        <input type="password" name="password2" value={formData.password2} onChange={handleChange} placeholder="Password2" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <button type="submit">Register</button>
      </form>
    );
  }
  
  export default RegistrationForm;