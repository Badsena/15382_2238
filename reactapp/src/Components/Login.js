import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      alert("Please fill in all fields");
      return;
    }
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address");
      return;
    }
    try {
      const res = await axios.post("https://9001.vs.amypo.com/user/login", form);
      const response = res.data;
      if (response.success) {
        // Store user info in localStorage for session management
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: response.email,
            username: response.username,
            role: response.role,
          })
        );
        if (response.role === "ADMIN") {
          alert(
            `Welcome Admin ${response.username}! Redirecting to admin dashboard...`
          );
          // Redirect to admin dashboard
          window.location.href = "/product-management";
        } else if (response.role === "USER") {
          alert(
            `Welcome ${response.username}! Redirecting to user dashboard...`
          );
          // Redirect to user dashboard
          window.location.href = "/product-list";
        }
      } else {
        alert(response.message);
      }
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm mt-5">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <div className="form-group">
                <input
                  name="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  onChange={handleChange}
                />
                <input
                  name="password"
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
              <button
                className="btn btn-primary btn-block"
                onClick={handleSubmit}
              >
                Login
              </button>
              <Link to="/register" style={{ marginRight: "15px" }}>
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
