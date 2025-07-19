import React from 'react'
import "./Footer.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer-container" id="contact">
      <div className="footer-content">
        <h3 className="footer-title">TrendCart &copy; {new Date().getFullYear()}</h3>
        <div className="footer-contact">
          <div className="footer-contact-item"><FaEnvelope className="footer-icon" /> Email: <a href="mailto:info@mernshop.com">aamirhasan2929@gmail.com</a></div>
          <div className="footer-contact-item"><FaPhone className="footer-icon" /> Phone: <a href="tel:+1234567890">+91 9798527832</a></div>
          <div className="footer-contact-item"><FaMapMarkerAlt className="footer-icon" /> Address: 123 HR chok, BGS City, 851211</div>
        </div>
      </div>
    </footer>
  )
}
