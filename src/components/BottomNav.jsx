import React from 'react';
import { NavLink } from 'react-router-dom';
import '../CSS/BottomNav.css';
export default function BottomNav({ navItems }) {
  return (
    <nav className="bottom-nav mobile-only">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
          end={item.path === '/'}
        >
          <span className="icon">{item.icon}</span>
          <span className="label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}