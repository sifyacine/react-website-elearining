import React from "react";
import Logo from "../assets/pedaconnect_logo.png";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-content">
        {/* Main Footer Section */}
        <div className="footer-main">
          {/* Logo and Description */}
          <div className="footer-brand">
            <div className="footer-logo-container">
              <img src={Logo} alt="PedaConnect Logo" className="footer-logo" />
              <span className="footer-brand-text">PedaConnect</span>
            </div>
            <p className="footer-description">
              Empowering students through innovative education solutions. 
              Connecting learners, educators, and communities for a brighter future.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <BsTwitter />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <SiLinkedin />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <BsYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#programs">Programs</a></li>
              <li><a href="#admissions">Admissions</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#careers">Careers</a></li>
            </ul>
          </div>

          {/* Academic Programs */}
          <div className="footer-column">
            <h3 className="footer-title">Academic Programs</h3>
            <ul className="footer-links">
              <li><a href="#elementary">Elementary</a></li>
              <li><a href="#middle-school">Middle School</a></li>
              <li><a href="#high-school">High School</a></li>
              <li><a href="#online-learning">Online Learning</a></li>
              <li><a href="#summer-programs">Summer Programs</a></li>
              <li><a href="#extracurricular">Extracurricular</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-column">
            <h3 className="footer-title">Contact Us</h3>
            <div className="footer-contact">
              <div className="contact-item">
                <FiPhone className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <FiMail className="contact-icon" />
                <span>info@pedaconnect.edu</span>
              </div>
              <div className="contact-item">
                <FiMail className="contact-icon" />
                <span>admissions@pedaconnect.edu</span>
              </div>
              <div className="contact-item">
                <FiMapPin className="contact-icon" />
                <span>123 Education Street<br />Learning City, LC 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <div className="newsletter-content">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for the latest news and updates</p>
          </div>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="newsletter-input"
            />
            <button className="newsletter-button">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="footer-legal">
            <a href="#terms">Terms & Conditions</a>
            <span className="separator">|</span>
            <a href="#privacy">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="#cookies">Cookie Policy</a>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2024 PedaConnect. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;