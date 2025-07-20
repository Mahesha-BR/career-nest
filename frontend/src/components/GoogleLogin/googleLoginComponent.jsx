import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleLoginComponent = (props) => {
  const navigate =useNavigate();
  const handleOnSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const res = await axios.post(
      'http://localhost:4000/api/auth/google',
      { token },
      { withCredentials: true }
    );
    // Optionally save user info
     localStorage.setItem('isLogin', 'true');
     localStorage.setItem('userInfo', JSON.stringify(res.data.user));
     props.changeLoginValue(true)
     navigate('/feeds')
  };

  return (
    <div className='w-full'>
      <GoogleLogin
        onSuccess={handleOnSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
};

export default GoogleLoginComponent;
