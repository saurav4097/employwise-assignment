// src/components/UserList.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
    setUsers(response.data.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://reqres.in/api/users/${id}`);
    setUsers(users.filter(user => user.id !== id));
  };

  const filteredUsers = users.filter(user => user.first_name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="user-container">
      <h2>User List</h2>
      <input type="text" placeholder="Search Users" onChange={(e) => setSearch(e.target.value)} />
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            <img src={user.avatar} alt={user.first_name} />
            <p>{user.first_name} {user.last_name}</p>
            <button onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
