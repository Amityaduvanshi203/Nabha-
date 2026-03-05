// Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Top Wave Decoration */}
        <div className="footer-wave">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z" fill="rgba(255,255,255,0.03)"/>
          </svg>
        </div>

        {/* Main Footer Content */}
        <div className="footer-content">
          
          {/* College Brand */}
          <div className="footer-col brand-col">
            <div className="college-logo">
              <span className="logo-icon">🎓</span>
              <h3>Tanvi College</h3>
            </div>
            <p className="college-tagline">
              Empowering minds, shaping futures since 1995
            </p>
            <div className="accreditation">
              <span>🏆 A++ Grade by NAAC</span>
              <span>📊 Ranked #15 in India</span>
            </div>
          </div>

          {/* Academics */}
          <div className="footer-col">
            <h4 className="footer-title">Academics</h4>
            <ul className="footer-links">
              <li><a href="#">Undergraduate Programs</a></li>
              <li><a href="#">Postgraduate Programs</a></li>
              <li><a href="#">Doctoral Programs</a></li>
              <li><a href="#">Diploma Courses</a></li>
              <li><a href="#">Certificate Courses</a></li>
            </ul>
          </div>

          {/* Campus */}
          <div className="footer-col">
            <h4 className="footer-title">Campus</h4>
            <ul className="footer-links">
              <li><a href="#">Library</a></li>
              <li><a href="#">Laboratories</a></li>
              <li><a href="#">Sports Complex</a></li>
              <li><a href="#">Hostels</a></li>
              <li><a href="#">Canteen</a></li>
            </ul>
          </div>

          {/* Student Life */}
          <div className="footer-col">
            <h4 className="footer-title">Student Life</h4>
            <ul className="footer-links">
              <li><a href="#">Clubs & Societies</a></li>
              <li><a href="#">Events & Festivals</a></li>
              <li><a href="#">Cultural Activities</a></li>
              <li><a href="#">Sports Teams</a></li>
              <li><a href="#">Student Council</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-col">
            <h4 className="footer-title">Resources</h4>
            <ul className="footer-links">
              <li><a href="#">E-Library</a></li>
              <li><a href="#">Learning Management</a></li>
              <li><a href="#">Previous Papers</a></li>
              <li><a href="#">Scholarships</a></li>
              <li><a href="#">Placements</a></li>
            </ul>
          </div>
        </div>

        {/* Middle Connect Section */}
        <div className="footer-connect">
          <div className="connect-left">
            <h4>Join our academic community</h4>
            <p>Subscribe for updates on admissions, events, and more</p>
          </div>
          <div className="connect-right">
            <div className="newsletter-group">
              <input 
                type="email" 
                placeholder="Student / Parent email"
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="bottom-row">
            <div className="copyright">
              <p>© 2026 Tanvi College of Education. All rights reserved.</p>
            </div>
            <div className="social-links">
              <a href="#" className="social-link" title="Facebook">📘</a>
              <a href="#" className="social-link" title="Instagram">📷</a>
              <a href="#" className="social-link" title="Twitter">🐦</a>
              <a href="#" className="social-link" title="LinkedIn">💼</a>
              <a href="#" className="social-link" title="YouTube">▶️</a>
            </div>
            <div className="visitor-count">
              <span>👥 Campus Visitors: 12,347</span>
            </div>
          </div>
          <div className="footer-policies">
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Terms of Use</a>
            <span>•</span>
            <a href="#">Grievance Redressal</a>
            <span>•</span>
            <a href="#">Anti-Ragging</a>
            <span>•</span>
            <a href="#">NIRF</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;