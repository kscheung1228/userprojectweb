import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { setAuthToken, api } from './api';


function Dashboard() {
    const [data, setData] = useState([]);
    // Fetch data from the API
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint that requires authentication
        const response = api.get('/dj-rest-auth/user/');
        console.log("what is this",response)
        // Handle the response, e.g., set the fetched data in state
        return(response)
      } catch (error) {
        // Handle the error, e.g., display an error message
        console.log("dashboarderror",error)
      }
    };

  // Fetch data on component mount
  useEffect(() => {
    fetchData().then(output=>console.log(output));
  }, []);

  // Render the dashboard component
  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <ul>
        {/* {data?.map((item) => (
          <li key={item.id}>{item.name}</li>
        
        ))} */}

      </ul>
    </div>
  );
}

export default Dashboard;
  