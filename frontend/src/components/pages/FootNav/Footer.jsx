import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Footer.css'; // Import specific styles for Footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>Get to Know Us</h4>
        <ul>
          <li><Link to="/about">About Amazon</Link></li>
          <li><Link to="/careers">Careers</Link></li>
          <li><Link to="/press-releases">Press Releases</Link></li>
          <li><Link to="/amazon-science">Amazon Science</Link></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Connect with Us</h4>
        <ul>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">Instagram</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Make Money with Us</h4>
        <ul>
          <li><Link to="/sell-on-amazon">Sell on Amazon</Link></li>
          <li><Link to="/sell-under-amazon-accelerator">Sell under Amazon Accelerator</Link></li>
          <li><Link to="/protect-and-build-your-brand">Protect and Build Your Brand</Link></li>
          <li><Link to="/fulfilment-by-amazon">Fulfilment by Amazon</Link></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Let Us Help You</h4>
        <ul>
          <li><Link to="/your-account">Your Account</Link></li>
          <li><Link to="/returns-centre">Returns Centre</Link></li>
          <li><Link to="/recalls-and-product-safety-alerts">Recalls and Product Safety Alerts</Link></li>
          <li><Link to="/purchase-protection">100% Purchase Protection</Link></li>
          <li><Link to="/amazon-app-download">Amazon App Download</Link></li>
          <li><Link to="/help">Help</Link></li>
        </ul>
      </div>

      <div className="footer-bottom">
        <p>© 1996-2025, Amazon.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
};

export default Footer;
