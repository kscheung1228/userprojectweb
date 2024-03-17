import React, { useState , useEffect } from 'react';
import { apinointercept, apicsrf } from './api';
import { useLocation, useParams } from 'react-router-dom';
import { wrapper } from 'axios-cookiejar-support';



function TestcsrfForm() {


  const API_HOST = "http://127.0.0.1:8000"

let _csrfToken = null;

async function getCsrfToken() {
  if (_csrfToken === null) {
    const response = await fetch(`${API_HOST}/authentications/csrf/`, {
      credentials: 'include',
    });
    const data = await response.json();
    _csrfToken = data.csrfToken;
  }
  return _csrfToken;
}

async function testRequest(method) {
  let csrftoken = await getCsrfToken()
  const response = await fetch(`${API_HOST}/authentications/ping/`, {
    method: method,
    headers: (
      method === 'POST'
        ? {'X-CSRFToken': csrftoken,'csrftoken':csrftoken,"Vary":"Cookie,Origin",}
        : {}
    ),
    credentials: 'include',
  });
  const data = await response.json();
  return data.result;
}

//let repsonse =  testRequest('GET');
let repsonse1 =  testRequest('POST');

  return (
    <div>
      
    {repsonse1 && <p>{JSON.stringify(repsonse1)}</p>}
    </div>
  )
  }
export default TestcsrfForm;

