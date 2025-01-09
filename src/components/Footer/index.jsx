// Footer.jsx
import React from "react";
import "./index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-logo">ScreenBites</h2>
          <p className="footer-description">
            Enjoy delicious food delivered to your seat while you watch your favorite movies.
          </p>
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#menu" className="footer-link">Menu</a></li>
            <li><a href="#about" className="footer-link">About Us</a></li>
            <li><a href="#contact" className="footer-link">Contact</a></li>
            <li><a href="#faq" className="footer-link">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <p className="footer-contact">support@screenbites.com</p>
          <p className="footer-contact">+91 12345 67890</p>
          <div className="footer-socials">
            <a href="#" className="footer-social-link">Facebook</a>
            <a href="#" className="footer-social-link">Twitter</a>
            <a href="#" className="footer-social-link">Instagram</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ScreenBites. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
