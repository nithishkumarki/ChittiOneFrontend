import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiChevronDown, FiChevronUp, FiSmartphone, FiLogOut, FiSearch, FiSliders } from 'react-icons/fi';
import { ChittiContext } from '../context/ChittiContext.jsx';
import chittilogo from '../assets/chittilogo.png';
import '../CSS/Navbar.css';

export default function Navbar() {
  const { userData, logout } = useContext(ChittiContext);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isGradeDropdownOpen, setIsGradeDropdownOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('Class 1 to 4');

  const userDropdownRef = useRef(null);
  const gradeDropdownRef = useRef(null);
  const navigate = useNavigate();

  const displayName = userData?.username || userData?.email?.split('@')[0] || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (gradeDropdownRef.current && !gradeDropdownRef.current.contains(event.target)) {
        setIsGradeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    logout();
    setIsUserDropdownOpen(false);
    navigate('/');
  };

  const gradeOptions = [
    'Class Kindergarten to UKG',
    'Class 1 to 4',
    'Class 5 to 8',
    'Class 9 to 12',
    'Others'
  ];

  return (
    <header className="navbar">
      {/* Brand Logo - Displays on Mobile Screens Only */}
      <Link to="/" className="navbar-logo">
        <img src={chittilogo} alt="Chitti Logo" className="logo-image" />
      </Link>

      {/* Search Bar */}
      <div className="search-bar-container">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search courses, videos and shorts"
          className="search-input"
        />
      </div>

      {/* Right Action Menu */}
      <div className="navbar-right">
        {/* Grade Selector Container */}
        <div className="grade-selector-container" ref={gradeDropdownRef}>
          <button 
            className="class-selector"
            onClick={() => setIsGradeDropdownOpen(!isGradeDropdownOpen)}
            aria-label="Select Grade"
          >
            <FiSliders className="grade-icon" />
            <span className="selected-grade-label">{selectedGrade}</span>
            <FiChevronDown />
          </button>

          {isGradeDropdownOpen && (
            <div className="grade-dropdown-menu">
              <span className="grade-dropdown-title">CHOOSE YOUR GRADE</span>
              <div className="grade-options-grid">
                {gradeOptions.map((grade) => (
                  <button
                    key={grade}
                    className={`grade-chip ${selectedGrade === grade ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedGrade(grade);
                      setIsGradeDropdownOpen(false);
                    }}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {userData ? (
          <div className="user-menu-container" ref={userDropdownRef}>
            <button
              className="user-badge-btn"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            >
              <div className="avatar-circle">{initial}</div>
              <span className="username-text">{displayName}</span>
              {isUserDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {isUserDropdownOpen && (
              <div className="user-dropdown-menu">
                <div className="dropdown-user-info">
                  <div className="avatar-circle large">{initial}</div>
                  <div className="user-text">
                    <span className="user-name">{displayName}</span>
                    <span className="signed-in-tag">Signed in</span>
                  </div>
                </div>

                <div className="dropdown-divider" />

                <button className="dropdown-item">
                  <FiSmartphone className="dropdown-icon" />
                  <span>Get the app</span>
                </button>

                <button className="dropdown-item logout" onClick={handleSignOut}>
                  <FiLogOut className="dropdown-icon" />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate('/signupsignin')}>
            Log in
          </button>
        )}
      </div>
    </header>
  );
}