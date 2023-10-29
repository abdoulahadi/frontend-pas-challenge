import React from 'react';
import './Navbar.css';
function Navbar({ activeTab, onTabChange }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid m-4">   
      <img src="logo.svg" alt="XelKoom-AI NER" />

        <ul className="navbar-nav">
          <li className={`nav-item ${activeTab === 'text' ? 'active' : ''}`}>
            <button className="nav-link btn" onClick={() => onTabChange('text')}>Extraction de Texte</button>
          </li>
          <li className={`nav-item ${activeTab === 'pdf' ? 'active' : ''}`}>
            <button className="nav-link btn" onClick={() => onTabChange('pdf')}>Extraction de PDF</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
