import React from 'react';
// import { CookiesProvider, useCookies } from 'react-cookie'
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/DashBoard';
import PasswordResetForm from './components/PasswordReset'
import VerifyEmail from './components/VerifyEmail';
import PasswordResetConfirmForm from './components/PasswordResetConfirm';
import TestcsrfForm from './components/Testcsrf';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/dj-rest-auth/registration" element={<RegistrationForm />} />
        <Route exact path="/dj-rest-auth/login" element={<LoginForm />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/dj-rest-auth/password/reset" element={<PasswordResetForm />} />
        <Route path="password-reset/confirm/:Uid/:Token/" element={<PasswordResetConfirmForm />} />
        <Route path="/dj-rest-auth/registration/account-confirm-email/:Key" element={<VerifyEmail />} />
        <Route path="csrf/:Uid/:Token/" element={<TestcsrfForm />} />
      </Routes>
    </Router>
  );
}

export default App;