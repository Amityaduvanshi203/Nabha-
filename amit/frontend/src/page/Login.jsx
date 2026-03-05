import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Auth.css";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const classes = [
    "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", 
    "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", 
    "Class 11", "Class 12"
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!role || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Class validation for student role (optional - can select any class during login)
    // If no class selected, student can select any class later

    // Simple authentication logic (in real app, this would be an API call)
    // For demo purposes, we'll accept any email/password and redirect based on role
    const userRole = role.toLowerCase();
    
    // Use AuthContext login method
    login(userRole, email, selectedClass);

    // Redirect based on role
    switch (userRole) {
      case 'student':
        navigate('/student');
        break;
      case 'teacher':
        navigate('/teacher');
        break;
      case 'parent':
        navigate('/parent');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        setError("Invalid role selected");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        {/* Role Dropdown */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="auth-input"
        >
          <option value="">Select Role</option>
          <option value="parent">Parent</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
        </select>

        {/* Class Selection - Only show for student role */}
        {role.toLowerCase() === 'student' && (
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="auth-input"
          >
            <option value="">Select Your Class</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        )}

        <input 
          type="email" 
          placeholder="Enter Email" 
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Enter Password" 
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="error-message">{error}</div>}

        <button className="auth-btn" onClick={handleLogin}>Login</button>

        <p>
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
