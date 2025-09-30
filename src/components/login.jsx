import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {

  const[email,setEmail]=useState("abii@gmail.com");
  const[password,setPassword]=useState("Password@123");
  const[error,seterror]=useState("")
  const dispatch=useDispatch();
  const navigate =useNavigate();
  const handleLogin=async()=>{
    
    try{
      const res = await axios.post(
        "http://localhost:3000/login",
        { email, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data))
      navigate('/')
    
  }catch(err){
    seterror(err?.response?.data||"Something went wrong");
    console.log(err?.response?.message);
  }
  
};
  return (
    <div className='flex justify-center my-25'>
      <div className="card card-dash bg-gray-200 w-96">
  <div className="card-body">
    <h2 className="card-title justify-center text-black">Login</h2>
    <div>
      <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)
      }}placeholder="User@gmail.com" className="input input-bordered w-full max-w-xs mb-4" />
      <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)
      }}placeholder="Password" className="input input-bordered w-full max-w-xs mb-4" />
    </div>
    <p className='text-red-500'>{error.message}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login
