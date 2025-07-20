import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLoginComponent from '../../components/GoogleLogin/googleLoginComponent';
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios';

const Signup = (props) =>
{
  const navigate = useNavigate();
  const [registerField,setRegidterField]=useState({email:"",password:"",f_name:""});

  const handleInputFiled = (event,key)=>{
    setRegidterField({...registerField,[key]:event.target.value})
   
  }
  const handleRegister =async()=>{
    if(registerField.email.trim().length===0 || registerField.password.trim().length===0 || registerField.f_name.trim().length===0){
      return toast.error("Please Fill All Details.")
    }
    await axios.post('http://localhost:4000/api/auth/register',registerField)
    .then(res=>{
      toast.success("You have registere successfully");
      setRegidterField({...registerField,email:"",password:"",f_name:""})
       navigate('/login')

    }).catch(err=>{
      console.log(err)
      toast.error(err?.response?.data?.error)
    })
  }
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='text-4xl mb-5'> Make the most od your professional life</div>
      <div className='w-[85%] md:w-[28%] shadow-xl rounded-sm box p-10'>
        <div className='flex flex-col gap-4'>
          <div>
            <label htmlFor="email">Email</label>
            <input value={registerField.email} 
            onChange={(e)=>handleInputFiled(e,'email')} 
            type="text" className='w-full text-xl border-2 rounded-lg px-5 py-1' placeholder='Email' />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input value={registerField.password} 
            onChange={(e)=>handleInputFiled(e,'password')}
             type="password" className='w-full text-xl border-2 rounded-lg px-5 py-1' placeholder='Password' />
          </div>
          <div>
            <label htmlFor="f_name">Full name</label>
            <input value={registerField.f_name} 
            onChange={(e)=>handleInputFiled(e,'f_name')}
            type="text" className='w-full text-xl border-2 rounded-lg px-5 py-1' placeholder='Full Name' />
          </div>
          <div onClick={handleRegister}
          className='w-full hover:bg-blue-900 bg-blue-800 text-white px-3 py-4 
          rounded-xl text-center text-xl cursor-pointer my-2'>Register</div>
        </div>
        <div className='flex items-center gap-2'>
        <div className='border-b-1 border-gray-400 w-[45%]'/><div>or</div>
        <div className='border-b-1 border-gray-400 w-[45%] my-6'/>
        </div>
        <div>
          <GoogleLoginComponent changeLoginValue={props.changeLoginValue}/>
        </div>
      </div>
      
        <div className='mt-4 mb-10 '>Already on CareerNest?
          <Link to='/login' className='text-blue-800 cursor-pointer'>Sign in</Link>

        </div>
        <ToastContainer/>
    </div>
  );
};

export default Signup;