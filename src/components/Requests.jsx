import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addrequest } from '../utils/requestSlice';
import { X, Heart } from "lucide-react";

const Requests = () => {
    const requests = useSelector((store)=>store.request);
    const dispatch = useDispatch();

    const request = async()=>{
        try{
        const res=await axios.get(BASE_URL+"/user/requests", { withCredentials: true })
        console.log(res);
        dispatch(addrequest(res.data.data));

        }catch(err){
            console.log(err);
        }
        
    }
    useEffect(()=>{
        request();

    },[])
    if (!requests) return <p>Loading...</p>;
  if (requests.length === 0) return <h1>No requests Found</h1>;

  return (
    <div className="m-6">
      <h1 className="text-2xl font-bold mb-6 text-center">✨ Your Requests</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {requests.map((request) => (
          <div
            key={request._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transform transition duration-300 w-56"
          >
            {/* Profile Image - full visible */}
            <img
              src={request.fromuserId.photoUrl}
              alt={request.fromuserId.firstName}
              className="w-full h-auto object-contain"
            />

            {/* Details */}
            <div className="p-3 bg-gradient-to-r from-pink-50 via-white to-purple-50 text-center">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {request.fromuserId.firstName} {request.fromuserId.lastName}
              </h2>
              <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                {request.fromuserId.about || "No bio available"}
              </p>
              <p className="text-gray-600 text-xs mt-1 line-clamp-2">Age: 
                {request.fromuserId.age || "No bio available"}
              </p>
              <div className="flex justify-center gap-8 mt-5">
          <button className="flex items-center justify-center w-16 h-16 rounded-full shadow-lg bg-gray-400 hover:scale-110 transition">
            <X className="w-7 h-7 text-white" />
          </button>
          <button className="flex items-center justify-center w-16 h-16 rounded-full shadow-lg bg-pink-400 hover:scale-110 transition">
            <Heart className="w-7 h-7 text-white" />
          </button>
        </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Requests
