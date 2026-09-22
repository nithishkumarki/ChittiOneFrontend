import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import '../CSS/SignupSignin.css';
import loginimage from '../assets/loginimage.png'; // Update path if needed

const SignupSignin = () => {
  const [state, setState] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleState = () => {
    setState(state === 'signin' ? 'signup' : 'signin');
  };

  const signup = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_ALCB_API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });
      const data = await response.json();

      if (data.status === 'success' || data.success) {
        localStorage.setItem('auth-token', data.token);
        window.location.replace('/');
      } else {
        alert(data.error || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during sign up.');
    }
  };

  const signin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_ALCB_API_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });
      const data = await response.json();

      if (data.success || data.status === 'success') {
        localStorage.setItem('auth-token', data.token);
        window.location.replace('/');
      } else {
        alert(data.error || 'Signin failed');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during sign in.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        
        {/* Left Side: Mascot Illustration */}
        <div className="auth-illustration">
          <img src={loginimage} alt="Chitti Mascot" />
        </div>

        {/* Right Side: Form */}
        <div className="auth-form-wrapper">
          <div className="auth-header">
            {state === 'signin' ? (
              <>
                <h2>Chitti Accounts</h2>
                <h1>Login</h1>
              </>
            ) : (
              <h1>Create Account</h1>
            )}
          </div>

          <div className="auth-fields">
            {state === 'signup' && (
              <div className="input-group">
                <input
                  name="username"
                  type="text"
                  placeholder="Name"
                  value={formData.username}
                  onChange={handleFormChange}
                />
              </div>
            )}

            <div className="input-group">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleFormChange}
              />
            </div>

            <div className="input-group password-group">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={handleFormChange}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {state === 'signup' && (
              <div className="recaptcha-box">
                <input type="checkbox" id="recaptcha" />
                <label htmlFor="recaptcha">I'm not a robot</label>
                <div className="recaptcha-logo">reCAPTCHA</div>
              </div>
            )}

            <button
              className="btn-primary"
              onClick={state === 'signup' ? signup : signin}
            >
              {state === 'signup' ? 'Sign up' : 'Log in'}
            </button>

            <div className="divider">
              <span>{state === 'signin' ? 'or' : 'Or'}</span>
            </div>

            {/* Social Logins */}
            <div className="social-options">
              {state === 'signin' && (
                <>
                  <button className="btn-social btn-whatsapp">
                    <FaWhatsapp className="icon-wa" />
                    <span>Login with WhatsApp</span>
                    <span className="badge-beta">BETA</span>
                  </button>

                  <button className="btn-social btn-outline">
                    <FiMail />
                    <span>Email me a sign-in link</span>
                  </button>
                </>
              )}

              <button className="btn-social btn-outline">
                <FcGoogle className="icon-google" />
                <span>{state === 'signin' ? 'Continue with Google' : 'Signup with Google'}</span>
              </button>
            </div>

            {/* Links & Switcher */}
            <div className="auth-footer-links">
              {state === 'signin' ? (
                <>
                  <p>
                    New to Chitti?{' '}
                    <span className="link-action" onClick={toggleState}>
                      Create an account
                    </span>
                  </p>
                  <a href="#forgot" className="sub-link">
                    Forgot your password?
                  </a>
                  <a href="#help" className="sub-link">
                    Need help signing in?
                  </a>
                </>
              ) : (
                <>
                  <p className="terms-text">
                    By continuing you agree to our{' '}
                    <Link to="/terms" className="sub-link-bold">Terms</Link> and{' '}
                    <Link to="/privacy" className="sub-link-bold">Privacy Policy</Link>.
                  </p>
                  <p>
                    Already have an account?{' '}
                    <span className="link-action" onClick={toggleState}>
                      Sign in
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignupSignin;