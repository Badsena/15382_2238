import React, { useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.username || !form.password) {
      alert("Please fill in all fields");
      return;
    }
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address");
      return;
    }
    // Password strength validation
    if (form.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    try {
    //   const res = await axios.post("http://localhost:9000/user/register", form);
    //   alert(res.data);
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm mt-5">
            <div className="card-body">
              <h2 className="text-center mb-4">Register</h2>
              <div className="form-group">
                <input
                  name="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  onChange={handleChange}
                />
                <input
                  name="username"
                  className="form-control mb-3"
                  placeholder="Username"
                  onChange={handleChange}
                />
                <input
                  name="password"
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <select
                  name="role"
                  className="form-control mb-3"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <button
                className="btn btn-primary btn-block"
                onClick={handleSubmit}
              >
                Register
              </button>
              {/* <Link to="/">Login</Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
