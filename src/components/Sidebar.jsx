import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiDownload, FiHelpCircle } from 'react-icons/fi';
import chittilogo from '../assets/chittilogo.png';
import '../CSS/Sidebar.css';

export default function Sidebar({ navItems }) {
  return (
    <aside className="sidebar desktop-only">
      <div className="brand-logo">
        <img src={chittilogo} alt="Chitti Logo" />
        <span className="logo-text">Chitti</span>
      </div>

      <nav className="nav-menu">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            end={item.path === '/'}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <a href="#download-play"><FiDownload /> Download on Google Play</a>
        <a href="#download-appstore"><FiDownload /> Download on App Store</a>
        <a href="#support"><FiHelpCircle /> Contact Support</a>
      </div>
    </aside>
  );
}