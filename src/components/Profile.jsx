import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
export default function Profile() {
  const [profile, setProfile] = useState({});
  const { user, setUser } = useContext(AppContext);
  const [form, setForm] = useState({});
  const [error, setError] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const url = `${API_URL}/api/users/${user.id}/profile`;
      const result = await axios.get(url);
      setProfile(result.data);
      console.log(profile);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = () => {
    setUser({});
    Navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
     e.preventDefault();
    try {
      const url = `${API_URL}/api/users/${profile._id}/profile`;
      const result = await axios.patch(url, form);
      fetchProfile();
      setError("Data saved successfully.");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  return (
    <div className="profile-container">
      <h3 className="profile-title">My Profile</h3>
      <button className="profile-logout-btn" onClick={logout}>Logout</button>
      <form className="profile-form">
        <p>
          <input
            name="firstName"
            type="text"
            className="profile-input"
            onChange={handleChange}
            defaultValue={profile.firstName}
          />
        </p>
        <p>
          <input
            name="lastName"
            type="text"
            className="profile-input"
            onChange={handleChange}
            defaultValue={profile.lastName}
          />
        </p>
        <p>
          <input
            name="email"
            type="text"
            className="profile-input"
            onChange={handleChange}
            defaultValue={profile.email}
          />
        </p>
        <p>
          <input
            name="password"
            type="password"
            className="profile-input"
            onChange={handleChange}
            defaultValue={profile.password}
          />
        </p>
        <button className="profile-update-btn" onClick={handleSubmit}>Update Profile</button>
      </form>
      {error && <div className="profile-error">{error}</div>}
    </div>
  );
}
