import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addrequest, removerequest } from '../utils/requestSlice';
import { X, Heart } from "lucide-react";

const Requests = () => {
    const requests = useSelector((store)=>store.request);
    const dispatch = useDispatch();

    const reviewRequest = async(status,_id)=>{
        try{
            await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true})
            dispatch(removerequest(_id))
        }catch(err){
            console.log(err);
        }
    }

    const fetchRequests = async()=>{
        try{
            const res=await axios.get(BASE_URL+"/user/requests", { withCredentials: true })
            dispatch(addrequest(res.data.data));
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchRequests();
    },[])

    if (!requests) return <p>Loading...</p>;

    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 py-8">
        {requests.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
              No Requests Found
            </h1>
            <p className="text-gray-600 text-center max-w-sm">
              You have no pending requests at the moment. Come back later to check new requests.
            </p>
          </div>
        ) : (
          <div className="m-6">
            <h1 className="text-2xl font-bold mb-6 text-center text-black">✨ Your Requests</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {requests.map((request) => (
                <div
                  key={request._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transform transition duration-300 w-56"
                >
                  <img
                    src={request.fromuserId.photoUrl}
                    alt={request.fromuserId.firstName}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-3 bg-gradient-to-r from-pink-50 via-white to-purple-50 text-center">
                    <h2 className="text-lg font-semibold text-gray-800 truncate">
                      {request.fromuserId.firstName} {request.fromuserId.lastName}
                    </h2>
                    <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                      {request.fromuserId.about || "No bio available"}
                    </p>
                    <p className="text-gray-600 text-xs mt-1">
                      Age: {request.fromuserId.age || "N/A"}
                    </p>
                    <div className="flex justify-center gap-8 mt-5">
                      <button className="flex items-center justify-center w-16 h-16 rounded-full shadow-lg bg-gray-400 hover:scale-110 transition"
                        onClick={()=> reviewRequest("rejected",request._id)}>
                        <X className="w-7 h-7 text-white" />
                      </button>
                      <button className="flex items-center justify-center w-16 h-16 rounded-full shadow-lg bg-pink-400 hover:scale-110 transition"
                        onClick={()=> reviewRequest("accepted",request._id)}>
                        <Heart className="w-7 h-7 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
}

export default Requests;
