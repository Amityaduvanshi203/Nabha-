import React from "react";
import "./About.css"; // optional for custom styling

export default function About() {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>About Tanvi College</h1>
          <p>Empowering minds, shaping futures since 1995</p>
        </div>
      </section>

      {/* COLLEGE HISTORY */}
      <section className="about-history">
        <h2>Our Journey</h2>
        <p>
          Tanvi College has been at the forefront of education for over 25 years.
          We combine tradition with innovation to provide a holistic learning
          environment. Our state-of-the-art campus, expert faculty, and
          dedicated student support ensure that every learner thrives.
        </p>
      </section>

      {/* VISION & MISSION */}
      <section className="about-vision-mission">
        <div className="vm-card">
          <h3>Our Vision</h3>
          <p>
            To be a leading institution in quality education, fostering innovation
            and lifelong learning.
          </p>
        </div>
        <div className="vm-card">
          <h3>Our Mission</h3>
          <p>
            To empower students with knowledge, critical thinking, and skills
            to succeed in a global society.
          </p>
        </div>
      </section>

      {/* FACULTY & CAMPUS */}
      <section className="about-campus">
        <div className="campus-image">
          <img src="/amit2.png" alt="College Campus" />
        </div>
        <div className="campus-info">
          <h2>State-of-the-Art Campus</h2>
          <p>
            Our sprawling campus spans 50 acres of green spaces with modern
            classrooms, laboratories, libraries, and recreational facilities.
            Students enjoy an environment that nurtures creativity, innovation,
            and collaboration.
          </p>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="about-achievements">
        <h2>Our Achievements</h2>
        <div className="achievements-grid">
          <div className="achievement-card">
            <span>🏆</span>
            <p>Ranked #5 Nationally</p>
          </div>
          <div className="achievement-card">
            <span>🎓</span>
            <p>95% Placement Rate</p>
          </div>
          <div className="achievement-card">
            <span>👨‍🏫</span>
            <p>300+ Expert Faculty</p>
          </div>
          <div className="achievement-card">
            <span>👥</span>
            <p>5000+ Students</p>
          </div>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <section className="about-footer-note">
        <p>
          Join Tanvi College and be part of a legacy that values knowledge,
          innovation, and holistic development.
        </p>
      </section>
    </div>
  );
}
