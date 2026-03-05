import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1>Contact Our College</h1>
        <p>We're here to help! Reach out to us for any queries or support.</p>
      </section>

      <section className="contact-info">
        <div className="info-item">
          <h3>Address</h3>
          <p>123 College Avenue, City, State, Country</p>
        </div>
        <div className="info-item">
          <h3>Phone</h3>
          <p>+91 12345 67890</p>
        </div>
        <div className="info-item">
          <h3>Email</h3>
          <p>info@college.edu</p>
        </div>
      </section>

      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Subject" required />
          <textarea placeholder="Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
}
