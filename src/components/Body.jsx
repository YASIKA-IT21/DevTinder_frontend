import React, { useEffect } from 'react'
import NavBar from './NavBar.jsx'
import Footer from './Footer.jsx'
import { Outlet } from 'react-router-dom'
import { BASE_URL } from '../utils/constant.js'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Body = () => {
   const navigate =useNavigate();
  const dispatch=useDispatch();
  const userData = useSelector((store)=>store.user);
   const fetchuser=async()=>{
    try{
      const res = await axios.get(BASE_URL+"/profile/view",{
        withCredentials:true,
      });
      dispatch(addUser(res.data.user));
      
    }catch(err){
      if(err.status === 401){
      navigate("/login")


      }
      console.log(err);

    }

    };
    useEffect(()=>{
      if(!userData){
        fetchuser();

      }

    },[]);
    
  return (
   
    <div>
        <NavBar />
        <Outlet/>
        <Footer/>
      
    </div>
  )
}

export default Body
