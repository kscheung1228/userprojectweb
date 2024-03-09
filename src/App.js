import React from 'react';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/DashBoard';
import PasswordResetForm from './components/PasswordReset'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/dj-rest-auth/registration" element={<RegistrationForm />} />
        <Route exact path="/dj-rest-auth/login" element={<LoginForm />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/dj-rest-auth/password/reset" element={<PasswordResetForm />} />
      </Routes>
    </Router>
  );
}

export default App;