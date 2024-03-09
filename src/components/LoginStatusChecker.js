import { useState, useEffect } from 'react';
import { setAuthToken } from './api';

const LoginStatusChecker = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
      // Simulating a login check
      const checkLoginStatus = () => {
        // Replace this with your actual login check logic
        const isLoggedIn = localStorage.getItem('isloggined')==='true';
        if (localStorage.getItem("jwt") !== null) {
          setIsLoggedIn(isLoggedIn);
          setAuthToken(localStorage.getItem("jwt"))
        }
      };
      checkLoginStatus();
    }, []);
  
  }