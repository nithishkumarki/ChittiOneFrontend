import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { FiHome, FiBookOpen, FiTool, FiFilm, FiUser } from 'react-icons/fi';
import SearchResults from './pages/SearchResults';

// Inside your <Routes> definition:

// Context
import ChittiContextProvider from './context/ChittiContext.jsx';

// Components
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import BottomNav from './components/BottomNav.jsx';
import CourseViewer from './components/CourseViewer.jsx';

// Pages
import Home from './pages/Home.jsx';
import Courses from './pages/Courses.jsx';
import Builds from './pages/Builds.jsx';
import Shorts from './pages/Shorts.jsx';
import Profile from './pages/Profile.jsx';
import SignupSignin from './pages/SignupSignin.jsx';
import './App.css';

function MainLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signupsignin';

  const navItems = [
    { path: '/', label: 'Home', icon: <FiHome /> },
    { path: '/courses', label: 'Courses', icon: <FiBookOpen /> },
    { path: '/builds', label: 'Builds', icon: <FiTool /> },
    { path: '/shorts', label: 'Shorts', icon: <FiFilm /> },
    { path: '/profile', label: 'Profile', icon: <FiUser /> },
  ];

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/signupsignin" element={<SignupSignin />} />
      </Routes>
    );
  }

  return (
    <div className="app-container">
      <Sidebar navItems={navItems} />

      <div className="main-wrapper">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseViewer />} />
            <Route path="/builds" element={<Builds />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>

      <BottomNav navItems={navItems} />
    </div>
  );
}

export default function App() {
  return (
    <ChittiContextProvider>
      <Router>
        <MainLayout />
      </Router>
    </ChittiContextProvider>
  );
}