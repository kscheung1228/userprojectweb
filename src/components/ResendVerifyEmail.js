import React, { useState } from 'react';
// import axios from 'axios';
import { setAuthToken, apinointercept } from './api';


function ResendVerifyEmailForm() {
    const [formData, setFormData] = useState({
      email: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState();
  
    // Handle form input changes
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Make a POST request to the registration endpoint of your API
        const response = await apinointercept.post('dj-rest-auth/registration/resend-email/', formData);
        setMessage(response.data);
        setError('');
        setAuthToken(response.data.access,response.data.refresh)
        // Handle the response, e.g., display a success message or redirect to the login page
      } catch (error) {
        // Handle the error, e.g., display an error message
        console.error(error);
        setMessage('');
        setError(JSON.stringify(error.response.data));
      }
    };
  
    // Render the registration form
    return (
      <form onSubmit={handleSubmit}>
        {/* <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
        <input type="password" name="password1" value={formData.password1} onChange={handleChange} placeholder="Password1" />
        <input type="password" name="password2" value={formData.password2} onChange={handleChange} placeholder="Password2" /> */}
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <button type="submit">Resend Email</button>
            <div>
                {error && <p>{JSON.stringify(error)}</p>}
                {message && <p>{JSON.stringify(message)}</p>}
            </div>
      </form>
    );
  }
  
  export default ResendVerifyEmailForm;