import React from "react";
import { X, Heart } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { removeFeed } from "../utils/feedslice";
import { useDispatch } from "react-redux";

const Usercard = ({ user, showActions = true }) => {
  if (!user) return null;
  const dispatch = useDispatch();

  const selection = async (status, userid) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userid}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userid));
    } catch (err) {
      console.log(err);
    }
  };

  const { firstName, lastName, age, photoUrl, about, skills } = user;

  return (
    <div className="relative w-80 h-[500px] bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
      
      {/* ✅ Fixed Image Section */}
      <div className="w-full h-64 overflow-hidden relative">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent" />
      </div>

      {/* ✅ Scrollable Details Section */}
      <div className="p-4 h-[calc(500px-16rem)] overflow-y-auto bg-gradient-to-r from-pink-50 via-white to-purple-50 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">
          {firstName} {lastName},{" "}
          <span className="text-gray-500 font-medium">{age}</span>
        </h2>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{lastName}</p>
        <p className="text-gray-600 text-sm mt-1">{about}</p>

        {skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gradient-to-r from-pink-200 to-purple-200 text-gray-800 rounded-full text-xs font-semibold shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* ✅ Action Buttons */}
        {showActions && (
          <div className="flex justify-center gap-8 mt-5">
            <button
              className="flex items-center justify-center w-16 h-16 rounded-full shadow-lg bg-gray-400 hover:scale-110 transition"
              onClick={() => selection("ignored", user._id)}
            >
              <X className="w-7 h-7 text-white" />
            </button>

            <button
              className="flex items-center justify-center w-16 h-16 rounded-full shadow-lg bg-pink-400 hover:scale-110 transition"
              onClick={() => selection("interested", user._id)}
            >
              <Heart className="w-7 h-7 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Usercard;
