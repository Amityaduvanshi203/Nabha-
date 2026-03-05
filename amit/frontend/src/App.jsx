import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";
import About from "./page/About"; 
import Gallery from "./page/Gallery";
import Contact from "./page/Contact";
import Student from "./page/Student";
import Teacher from "./page/Teacher";
import Parent from "./page/Parent";
import Admin from "./page/Admin";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/student" element={<Student />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/parent" element={<Parent />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
