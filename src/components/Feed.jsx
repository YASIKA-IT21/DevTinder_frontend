import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedslice'
import Usercard from './Usercard'

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

  

  return (
    feed&&(<div className='flex justify-center my-10'>
      <Usercard user ={feed[0]}/>
    </div>)
  );
};

export default Feed;
