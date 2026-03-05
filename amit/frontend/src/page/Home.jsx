// Home.jsx - Fixed Card Layout
import React, { useEffect, useRef } from 'react';
import './Home.css';

function Home() {
  const statsRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.info-section, .card, .stat-item').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">
      {/* CINEMATIC HERO SECTION */}
      <section className="hero">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/amit.mp4" type="video/mp4" />
        </video>
        
        <div className="hero-content">
          <h1>
            <span>A</span>
            <span>M</span>
            <span>I</span>
            <span>T</span>
            <span></span>
            <span> </span>
            <span>C</span>
            <span>O</span>
            <span>L</span>
            <span>L</span>
            <span>E</span>
            <span>G</span>
            <span>E</span>
          </h1>
          <p>Where Dreams Take Flight ✨</p>
        </div>
        
        <div className="hero-scroll">
          <span></span>
          <small>Scroll to explore</small>
        </div>
      </section>

      {/* PREMIUM COLLEGE SECTION */}
      <section className="info-section">
        <div className="info-text">
          <h2 data-text="Our College">Our College</h2>
          <p>
            Step into a world of excellence at Tanvi College, where tradition meets innovation. 
            Our state-of-the-art campus spans 50 acres of lush greenery, featuring cutting-edge 
            laboratories, modern classrooms, and spaces that inspire creativity.
          </p>
          <div className="feature-list">
            <div className="feature-item">
              <span>🏆</span>
              <span>Ranked #5 Nationally</span>
            </div>
            <div className="feature-item">
              <span>👥</span>
              <span>5000+ Students</span>
            </div>
            <div className="feature-item">
              <span>🎓</span>
              <span>95% Placement Rate</span>
            </div>
          </div>
        </div>

        <div className="info-image">
          <img src="/amit2.png" alt="College Campus" />
          <div className="image-caption">
            <span>✨ Main Academic Block</span>
          </div>
        </div>
      </section>

      {/* LUXURY HOSTEL SECTION */}
      <section className="info-section reverse">
        <div className="info-text">
          <h2 data-text="College Hostel">College Hostel</h2>
          <p>
            Experience home away from home in our premium hostel facilities. With smart rooms, 
            24/7 security, high-speed WiFi, and recreational areas, we ensure your stay is 
            comfortable and memorable. Choose from single, double, or luxury suites.
          </p>
          <div className="feature-list">
            <div className="feature-item">
              <span>🔒</span>
              <span>24/7 Security & CCTV</span>
            </div>
            <div className="feature-item">
              <span>🍽️</span>
              <span>Gourmet Mess</span>
            </div>
            <div className="feature-item">
              <span>🏋️</span>
              <span>Gym & Recreation</span>
            </div>
          </div>
        </div>

        <div className="info-image">
          <img src="/amit3.png" alt="College Hostel" />
          <div className="image-caption">
            <span>🏘️ Premium Hostel Block</span>
          </div>
        </div>
      </section>

      {/* CAMPUS FACILITIES - FIXED GRID LAYOUT */}
      <section className="features">
        <h2 className="section-title">
          <span>Premium</span>
          <span>Campus</span>
          <span>Facilities</span>
        </h2>
        
        <div className="features-grid">
          {/* OLYMPIC GROUND - Normal sized card */}
          <div className="card">
            <div className="card-image">
              <img src="/amit2.png" alt="Olympic Ground" />
              <div className="card-overlay">
                <span>FIFA Standard Ground</span>
              </div>
            </div>
            <div className="card-content">
              <h3>Olympic Ground</h3>
              <span className="card-category">Sports</span>
            </div>
            <div className="card-badge">⚽</div>
          </div>

          {/* ALL INDIA RANKING */}
          <div className="card">
            <div className="card-image">
              <img src="/amit2.png" alt="All India Ranking" />
              <div className="card-overlay">
                <span>Top 10 in India</span>
              </div>
            </div>
            <div className="card-content">
              <h3>All India Ranking</h3>
              <span className="card-category">Recognition</span>
            </div>
            <div className="card-badge">🏆</div>
          </div>

          {/* SMART CLASSROOMS */}
          <div className="card">
            <div className="card-image">
              <img src="/amit2.png" alt="Smart Classroom" />
              <div className="card-overlay">
                <span>AI-Enabled Learning</span>
              </div>
            </div>
            <div className="card-content">
              <h3>Smart Classrooms</h3>
              <span className="card-category">Technology</span>
            </div>
            <div className="card-badge">💻</div>
          </div>

          {/* DIGITAL LIBRARY */}
          <div className="card">
            <div className="card-image">
              <img src="/amit3.png" alt="Library" />
              <div className="card-overlay">
                <span>50k+ Books & Journals</span>
              </div>
            </div>
            <div className="card-content">
              <h3>Digital Library</h3>
              <span className="card-category">Knowledge</span>
            </div>
            <div className="card-badge">📚</div>
          </div>

          {/* COMPUTER LABS */}
          <div className="card">
            <div className="card-image">
              <img src="/amit2.png" alt="Computer Lab" />
              <div className="card-overlay">
                <span>Latest iMacs & Workstations</span>
              </div>
            </div>
            <div className="card-content">
              <h3>Computer Labs</h3>
              <span className="card-category">Technology</span>
            </div>
            <div className="card-badge">🖥️</div>
          </div>

          {/* CANTEEN - New card to complete the grid */}
          <div className="card">
            <div className="card-image">
              <img src="/amit2.png" alt="Canteen" />
              <div className="card-overlay">
                <span>Multi-Cuisine Food Court</span>
              </div>
            </div>
            <div className="card-content">
              <h3>Gourmet Canteen</h3>
              <span className="card-category">Dining</span>
            </div>
            <div className="card-badge">🍽️</div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENT STATS */}
      <section className="stats-section" ref={statsRef}>
        <div className="stat-item">
          <div className="stat-icon">🎓</div>
          <div className="stat-number">15K+</div>
          <div className="stat-label">Alumni Network</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-icon">🏆</div>
          <div className="stat-number">50+</div>
          <div className="stat-label">Awards Won</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-number">300+</div>
          <div className="stat-label">Expert Faculty</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-icon">💼</div>
          <div className="stat-number">500+</div>
          <div className="stat-label">Recruiters</div>
        </div>
      </section>
    </div>
  );
}

export default Home;