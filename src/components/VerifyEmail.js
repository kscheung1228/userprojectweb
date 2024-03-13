import React, { useState , useEffect } from 'react';
import { apinointercept } from './api';
import { useLocation, useParams } from 'react-router-dom';



function VerifyEmail() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState();

    const [formData, setFormData] = useState({
      Key: '',
    });

    

    const { pathname, search, params } = useCurrentURL();
    console.log(`Current path is ${pathname} with search ${search} and params`, params);
    
    console.log(params.Key)
    const key = params.Key
    // useEffect(() => {
    //     if (typeof (key) !== 'undefined') {
    //         setFormData({"key":})
    //     }
    //   }, [key])

      useEffect(() => {
        if (typeof (params.Key) !== 'undefined') {
            setFormData({"key":params.Key})
        }
      }, [params.Key]);

    console.log ("json",JSON.stringify(key))
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
        console.log("formdata",formData)
      try {
        // Make a POST request to the login endpoint of your API to obtain the JWT token
        const response = await apinointercept.post('/dj-rest-auth/registration/verify-email/', formData);
        setMessage(response.data);
        setError('');
        // Handle the response, e.g., store the JWT token in local storage or state
        // localStorage.setItem('token', response.data.token); // Store the JWT token in local storage
        // Redirect to the dashboard or perform any other necessary action
 
      } catch (error) {
        // Handle the error, e.g., display an error message
        console.error("loginerror",error);
        setMessage('');
        setError(JSON.stringify(error.response.data));
      }
    };
  
    // Render the login form
    return (
      <form onSubmit={handleSubmit}>
        <button type="submit">Verify Email</button>
        <div>
                {error && <p>{JSON.stringify(error)}</p>}
                {message && <p>{JSON.stringify(message)}</p>}
            </div>
      </form>
      
    );
  }
  
  export default VerifyEmail;



function useCurrentURL() {
    const location = useLocation();
    const params = useParams();
  
    return {
      pathname: location.pathname,
      search: location.search,
      params,
    };
  }

// export function VerifyEmail() {

    // setFormData({Key:params})
  
      
    // try {
        
        // Make a POST request to the login endpoint of your API to obtain the JWT token
        // const response = api.post('/dj-rest-auth/registration/verify-email/', formData);
        // setMessage(response.data);

        // Handle the response, e.g., store the JWT token in local storage or state

    //   } catch (error) {
        // Handle the error, e.g., display an error message
        // console.error("loginerror",error);
        // setMessage('');
        // setError(JSON.stringify(error.response.data));
    //   }

    //   return (
        //   <div>
        //           {error && <p>{JSON.stringify(error)}</p>}
        //           {message && <p>{JSON.stringify(message)}</p>}
        //       </div>
    //   );
//   }
  
//   export default VerifyEmail;