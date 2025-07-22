import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content container">
        <p>© {new Date().getFullYear()} D Shop. All rights reserved.</p>
        <p>Developed by DaniahMZ</p>
        
        <div className="footer-links">
          <a href="/about" className="footer-link">About Us</a>
          <a href="/contact" className="footer-link">Contact</a>
          <a href="/privacy" className="footer-link">Privacy Policy</a>
        </div>

        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link">
            {/* Facebook SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#4caf50" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.404.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.313h3.59l-.467 3.622h-3.123V24h6.116c.73 0 1.324-.596 1.324-1.326V1.326C24 .597 23.404 0 22.675 0z"/>
            </svg>
          </a>

          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-link">
            {/* Twitter SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#4caf50" viewBox="0 0 24 24">
              <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.933 4.933 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.373 4.482A13.94 13.94 0 011.671 3.15a4.902 4.902 0 001.523 6.556 4.897 4.897 0 01-2.228-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.902 4.902 0 01-2.224.085 4.918 4.918 0 004.59 3.41A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.212c9.058 0 14.009-7.513 14.009-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z"/>
            </svg>
          </a>

          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">
            {/* Instagram SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#4caf50" viewBox="0 0 24 24">
              <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0016.25 4h-8.5zm8.6 1.2a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zm-4.35 2.55a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
