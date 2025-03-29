// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
