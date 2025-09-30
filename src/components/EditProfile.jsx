import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Usercard from "./Usercard";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState([]);
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");
  const [toast, showtoast] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Populate fields when `user` prop changes
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setSkills(user.skills || []);
      setAbout(user.about || "");
      setEmail(user.email || "");
      setPhotoUrl(user.photoUrl || "");
    }
  }, [user]);

  const skillsInput = skills.join(", ");

  const handleSkillsChange = (e) => {
    setSkills(e.target.value.split(",").map((s) => s.trim()));
  };

  const handleSaveprofile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, skills, about, email, photoUrl },
        { withCredentials: true }
      );
      if (res?.data?.data) {
        dispatch(addUser(res.data.data));
        showtoast(true);
        setTimeout(() => showtoast(false), 3000);
        setError("");
      }
    } catch (err) {
      console.log(err?.response?.data);
      const data = err?.response?.data;
      setError(
        typeof data === "string" ? data : data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="flex justify-center my-10 gap-10 items-stretch ">
      {/* Edit Profile Card */}
      {/* Edit Profile Card */}
<div className="card bg-gray-200 w-96 h-[500px] flex flex-col">
  <div className="card-body overflow-y-auto">
    <h2 className="card-title justify-center text-black">Edit Profile</h2>

    <label className="label text-black">First Name</label>
    <input
      type="text"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      className="input input-bordered w-full mb-2"
    />

    <label className="label text-black">Last Name</label>
    <input
      type="text"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      className="input input-bordered w-full mb-2"
    />

    <label className="label text-black">Age</label>
    <input
      type="number"
      value={age}
      onChange={(e) => setAge(e.target.value)}
      className="input input-bordered w-full mb-2"
    />

    <label className="label text-black">Gender</label>
    <select
      value={gender}
      onChange={(e) => setGender(e.target.value)}
      className="select select-bordered w-full mb-2"
    >
      <option value="">Select gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>

    <label className="label text-black">Skills</label>
    <input
      type="text"
      value={skillsInput}
      onChange={handleSkillsChange}
      className="input input-bordered w-full mb-2"
    />

    <label className="label text-black">Photo URL</label>
    <input
      type="text"
      value={photoUrl}
      onChange={(e) => setPhotoUrl(e.target.value)}
      className="input input-bordered w-full mb-2"
    />

    <label className="label text-black">About</label>
    <textarea
      value={about}
      onChange={(e) => setAbout(e.target.value)}
      className="textarea textarea-bordered w-full mb-2"
    />

    <label className="label text-black">Email</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="input input-bordered w-full mb-4"
    />

    {error && <p className="text-red-500 mb-2">{error}</p>}

    <div className="card-actions justify-center">
      <button
        className="btn btn-primary w-full"
        onClick={handleSaveprofile}
      >
        Save Profile
      </button>
    </div>
  </div>
</div>

      {/* User Card (wrapped to allow stretch) */}
      <div className="w-96 h-full">
        <Usercard
          user={{ firstName, lastName, age, gender, about, skills, photoUrl, email }}
          showActions={false}
        />
      </div>

      {toast && (
        <div className="toast toast-top toast-start">
          <div className="alert alert-success">
            <span>Profile Updated successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
