import { Link } from "react-router-dom";
import { useState } from "react";
import "./Auth.css";

function Signup() {
  const [role, setRole] = useState(""); // State for role selection
  const [selectedClass, setSelectedClass] = useState(""); // State for class selection

  const classes = [
    "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", 
    "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", 
    "Class 11", "Class 12"
  ];

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>

        {/* Role Dropdown */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="auth-input"
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="parent">Parent</option>
          <option value="admin">Admin</option>
        </select>

        {/* Class Selection - Only show for student role */}
        {role.toLowerCase() === 'student' && (
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="auth-input"
          >
            <option value="">Select Your Class (Optional)</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        )}

        <input type="text" placeholder="Full Name" className="auth-input" />
        <input type="email" placeholder="Enter Email" className="auth-input" />
        <input type="password" placeholder="Create Password" className="auth-input" />

        <button className="auth-btn">Sign Up</button>

        <p>
          Already have an account? 
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
