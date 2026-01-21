import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginAdmin } from "../../utils/api";
import "./Css/login.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.username.length < 3 || formData.password.length < 6) {
      Swal.fire("Error", "Invalid username or password format", "error");
      return;
    }

    try {
      const { data } = await loginAdmin(formData);

      localStorage.setItem("adminToken", data.token);

      Swal.fire("Success", "Logged in successfully!", "success");

      setFormData({ username: "", password: "" });

      navigate("/admin/dashboard");
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Login failed!",
        "error"
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="off"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
