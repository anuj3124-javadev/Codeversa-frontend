import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../styles/Footer.css';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">⚡</div>
              <span className="logo-text">CodeVerse Lite</span>
            </div>
            <p className="footer-description">
              Build, compile, and run code in multiple languages with AI-powered assistance. 
              Code smarter and faster with our online compiler.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="GitHub">
                <span className="social-icon">🐙</span>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <span className="social-icon">🐦</span>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <span className="social-icon">💼</span>
              </a>
              <a href="#" className="social-link" aria-label="Discord">
                <span className="social-icon">💬</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <div className="footer-links">
              <Link to="/compiler" className="footer-link">Online Compiler</Link>
              <Link to="/features" className="footer-link">Features</Link>
              <Link to="/contact" className="footer-link">Contact Us</Link>
              <a href="#" className="footer-link">Documentation</a>
            </div>
          </div>

          {/* Languages */}
          <div className="footer-section">
            <h3 className="footer-heading">Languages</h3>
            <div className="footer-links">
              <span className="footer-link">Python</span>
              <span className="footer-link">Java</span>
              <span className="footer-link">C/C++</span>
              <span className="footer-link">JavaScript</span>
              <span className="footer-link">HTML/CSS</span>
            </div>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h3 className="footer-heading">Support</h3>
            <div className="footer-links">
              <a href="#" className="footer-link">Help Center</a>
              <a href="#" className="footer-link">API Documentation</a>
              <a href="#" className="footer-link">Community</a>
              <a href="#" className="footer-link">Status</a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {currentYear} CodeVerse Lite. All rights reserved.
          </div>
          <div className="footer-legal">
            <a href="#" className="legal-link">Privacy Policy</a>
            <a href="#" className="legal-link">Terms of Service</a>
            <a href="#" className="legal-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;