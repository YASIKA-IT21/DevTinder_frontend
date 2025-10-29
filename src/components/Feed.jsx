import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedslice'
import Usercard from './Usercard'
import { Link } from 'react-router-dom'

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  
  const dispatch = useDispatch();

  const getfeed = async () => {
    if (feed && feed.length > 0) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
      dispatch(addFeed(res.data.data)); // ✅ only push the array into Redux
     // console.log("Feeds:", res.data.data);
    } catch (err) {
      console.log("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    getfeed();
  }, []);
  if(feed<=0)return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
        No More Persons to View
      </h1>
      <p className="text-gray-600 text-center max-w-sm">
        You have reached the end. Come back later to see new users and connections.
      </p>
      <div className="mt-6">
      <Link to='/connections'>  <button className="px-6 py-3 bg-pink-500 text-white rounded-xl shadow-lg hover:bg-pink-600 transition">
          Go Back to Your Connections
        </button></Link>
      </div>
    </div>
  )

  

  return (
    feed&&(<div className='flex justify-center my-10'>
      <Usercard user ={feed[0]}/>
    </div>)
  );
};

export default Feed;
