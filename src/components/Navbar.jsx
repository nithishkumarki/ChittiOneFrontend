import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiChevronDown, FiChevronUp, FiSmartphone, FiLogOut, FiSearch, FiSliders, FiX } from 'react-icons/fi';
import { ChittiContext } from '../context/ChittiContext.jsx';
import chittilogo from '../assets/chittilogo.png';
import '../CSS/Navbar.css';

// Suggestion topics list for search auto-complete
const SEARCH_SUGGESTIONS = [
  'Biology',
  'Biomimicry',
  'CWC',
  'Chemistry',
  'Physics',
  'Coanda Effect',
  'String telephone',
  'Alphabet Fun'
];

export default function Navbar() {
  const { 
    userData, 
    logout, 
    selectedGrade, 
    setSelectedGrade, 
    gradeOptions,
    searchQuery,
    setSearchQuery
  } = useContext(ChittiContext);

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isGradeDropdownOpen, setIsGradeDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const userDropdownRef = useRef(null);
  const gradeDropdownRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  const displayName = userData?.username || userData?.email?.split('@')[0] || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  // Filter suggestion list based on current user input
  const suggestions = SEARCH_SUGGESTIONS.filter((item) =>
    item.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (gradeDropdownRef.current && !gradeDropdownRef.current.contains(event.target)) {
        setIsGradeDropdownOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (term) => {
    const queryTerm = term || searchQuery;
    if (!queryTerm.trim()) return;
    
    setSearchQuery(queryTerm);
    setIsSearchFocused(false);
    navigate(`/search/${encodeURIComponent(queryTerm.trim())}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleSignOut = () => {
    logout();
    setIsUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="navbar">
      {/* Brand Logo */}
      <Link to="/" className="navbar-logo">
        <img src={chittilogo} alt="Chitti Logo" className="logo-image" />
      </Link>

      {/* Controlled Search Input with Autocomplete */}
      <div 
        className={`search-bar-container ${isSearchFocused ? 'active' : ''}`} 
        ref={searchContainerRef}
      >
        <FiSearch className="search-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search courses, videos and shorts"
          className="search-input"
        />
        {searchQuery && (
          <button 
            className="clear-search-btn" 
            onClick={() => setSearchQuery('')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <FiX size={16} color="#888" />
          </button>
        )}

        {/* Search Suggestions Popup Dropdown */}
        {isSearchFocused && searchQuery.trim().length > 0 && (
          <div className="search-suggestions-dropdown">
            {suggestions.length > 0 ? (
              suggestions.map((item, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSearchSubmit(item)}
                >
                  <FiSearch className="suggestion-icon" />
                  <span>{item}</span>
                </div>
              ))
            ) : (
              <div className="suggestion-item no-match">
                <span>No results for "{searchQuery}"</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Action Menu */}
      <div className="navbar-right">
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