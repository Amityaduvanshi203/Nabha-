import React from "react";
import "./Gallery.css";

export default function Gallery() {
  return (
    <div className="gallery-page">
      {/* HERO SECTION with Video */}
      <section className="gallery-hero">
        <video
          className="amit-video"
          src="/amit.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Our College Gallery</h1>
          <p>Snapshots of our campus life and activities</p>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="gallery-grid-section">
        <div className="gallery-grid">
          <div className="gallery-card">
            <img src="/amit3.png" alt="Campus view" />
          </div>
          <div className="gallery-card">
            <img src="/amit2.png" alt="Library" />
          </div>
          <div className="gallery-card">
            <img src="/amit3.png" alt="Lab" />
          </div>
          <div className="gallery-card">
            <img src="/amit3.png" alt="Students" />
          </div>
          <div className="gallery-card">
            <img src="/amit2.png" alt="Events" />
          </div>
          <div className="gallery-card">
            <img src="/amit3.png" alt="Sports" />
          </div>
          <div className="gallery-card">
            <img src="/amit3.png" alt="Sports" />
          </div>
          <div className="gallery-card">
            <img src="/amit3.png" alt="Sports" />
          </div>
        </div>
      </section>
    </div>
  );
}
