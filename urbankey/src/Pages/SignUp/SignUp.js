import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    retypePassword: ''
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [retypePasswordError, setRetypePasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'email') {
      validateEmail(value);
    }

    if (name === 'password') {
      validatePassword(value);
    }

    if (name === 'retypePassword') {
      validateRetypePassword(value);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }
  };

  const validateRetypePassword = (retypePassword) => {
    if (retypePassword !== formData.password) {
      setRetypePasswordError('Passwords do not match.');
    } else {
      setRetypePasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailError || passwordError || retypePasswordError) {
      alert('Please fix the form errors before submitting.');
      return;
    }

    // Continue with form submission logic
    console.log('Form data submitted:', formData);
  };

  return (
    <div className='page-content'>
      <div>

        <div className='user-details'>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='fullName'></label>
              <input
                type='text'
                id='fullName'
                name='fullName'
                value={formData.fullName}
                onChange={handleChange}
                placeholder='Full Name'
                required
              />
            </div>

            <div>
              <label htmlFor='email'> {emailError && <span className='error'>{emailError}</span>}</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Email'
                required
              />
            </div>

            <div>
              <label htmlFor='password'> {passwordError && <span className='error'>{passwordError}</span>}</label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Password'
                required
              />
            </div>

            <div>
              <label htmlFor='retypePassword'>{retypePasswordError && <span className='error'>{retypePasswordError}</span>}</label>
              <input
                type='password'
                id='retypePassword'
                name='retypePassword'
                value={formData.retypePassword}
                onChange={handleChange}
                placeholder='Retype Password'
                required
              />
            </div>

            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
