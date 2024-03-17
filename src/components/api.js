import axios from "axios";
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

const BASE_URL = "http://127.0.0.1:8000"

export const api = axios.create(
    {
        baseURL:BASE_URL,
        timeout:5000,

    }
)

export const apicsrf = axios.create(
  {
    
      baseURL:BASE_URL,
      timeout:5000,
      withCredentials: true,
      withXSRFToken:true,
      xsrfHeaderName: 'X-CSRFToken',
      xsrfCookieName: 'csrftoken',
      credentials:'include',
      headers: {
        'Access-Control-Allow-Credentials': true,
        // 'MyCustomHeader2': '2'
    }
      
  }
)

export const apinointercept = axios.create(
  {
      baseURL:BASE_URL,
      timeout:5000,
  }
)

  

// apicsrf.interceptors.request.use(
//     (config) => {
//       if (config.url!=='/dj-rest-auth/login/' ) {
        
//         const cookies = Cookies.get('X-CSRFTOKEN')     
//         console.log("apicsrfinterceptor",cookies)     
//         if (cookies) {
//           config.headers.common['X-CSRFToken'] = cookies
//       }
//       return config;
//     }
//   },
//     (error) => Promise.reject(error)
//   );

api.interceptors.request.use(
  (config) => {
    if (config.url!=='/dj-rest-auth/login/' ) {
      console.log("requestinterceptors")
      const token = localStorage.getItem('jwt');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log('responseerror',error)
    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh');
        console.log ("refreshtoken",refreshToken)
        const response = await axios.post(originalRequest.baseURL+'/dj-rest-auth/token/refresh/', { Refresh:refreshToken });
        console.log ("apirefresh",response.data)
        const { token } = response.data;

        localStorage.setItem('jwt', token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
        console.log("responseintercepterror",error)
      }
    }

    return Promise.reject(error);
  }
);

export const setAuthToken = async (token,refreshtoken) => {
    if (token) {
      await localStorage.setItem('jwt', token); // Store the JWT token securely
      await localStorage.setItem('refresh', refreshtoken); // Store the JWT token securely
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      // await Keychain.resetGenericPassword();
      delete api.defaults.headers.common['Authorization'];
    }
  };
  
