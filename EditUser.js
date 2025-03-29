// src/components/EditUser.js
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`).then((res) => setUser(res.data.data));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`https://reqres.in/api/users/${id}`, user);
    navigate("/users");
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} />
        <input type="text" value={user.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })} />
        <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
