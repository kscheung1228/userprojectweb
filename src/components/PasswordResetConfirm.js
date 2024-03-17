import React, { useState , useEffect } from 'react';
import { apicsrf, apinointercept } from './api';
import { useLocation, useParams } from 'react-router-dom';



function PasswordResetConfirmForm() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState();

    const [formData, setFormData] = useState({
      uid: '',
      token: '',
      new_password1: '',
      new_password2: '',
    });


    const { pathname, search, params } = useCurrentURL();
    console.log(`Current path is ${pathname} with search ${search} and params`, params);
    
    useEffect(() => {
        if (typeof (params.Uid) !== 'undefined') {
            formData.uid = params.Uid
            formData.token = params.Token
            // setFormData({"uid":params.Uid,})
            // setFormData({"token":params.Token})
            console.log ("usereffect",formData)
            
        }
      }, [params.Uid,params.Token,formData]);

    // Handle form input changes
    const handleChange = (e) => {
        // e.target.name = e.target.value
      setFormData({ ...formData, [e.target.name]: e.target.value });
      
      console.log ("handlechange",formData, typeof(formData))
    };


    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
        console.log("formdata",formData)
      try {
        // Make a POST request to the login endpoint of your API to obtain the JWT token
        const response = await apinointercept.post('/dj-rest-auth/password/reset/confirm/', formData);
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
        <input type="password" name="new_password1" value={formData.new_password1} onChange={handleChange} placeholder="Password" />
        <input type="password" name="new_password2" value={formData.new_password2} onChange={handleChange} placeholder="Repeat Password" />
        <input type="hidden" name="uid" value={formData.uid}/>
        <input type="hidden" name="token" value={formData.token} />
        
        <button type="submit">Reset Password</button>
        <div>
                {error && <p>{JSON.stringify(error)}</p>}
                {message && <p>{JSON.stringify(message)}</p>}
            </div>
      </form>
      
    );
  }
  
  export default PasswordResetConfirmForm;



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