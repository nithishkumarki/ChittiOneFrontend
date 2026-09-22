import React, { createContext, useEffect, useState } from 'react';

export const ChittiContext = createContext(null);

const GRADE_OPTIONS = [
  'Class Kindergarten to UKG',
  'Class 1 to 4',
  'Class 5 to 8',
  'Class 9 to 12',
  'Others',
];

// Initial course data pool
const DUMMY_COURSES = [
  { id: 'alphabet-fun', title: 'Alphabet Fun', type: 'course', description: 'Early learning foundational alphabets', thumbnail: 'https://via.placeholder.com/400x220/ff69b4/ffffff?text=Alphabet+Fun' },
  { id: 'biology-1', title: 'Biology', type: 'course', description: 'Core Biology & Life Sciences', thumbnail: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=400&q=80' },
  { id: 'biology-2', title: 'Biology', type: 'course', description: 'Advanced Biological Concepts', thumbnail: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=400&q=80' },
  { id: 'cwc', title: 'CWC', type: 'course', description: 'Coding & Web Course', thumbnail: 'https://via.placeholder.com/400x220/330066/ffffff?text=CWC' },
  { id: 'chemistry', title: 'Chemistry', type: 'course', description: 'Chemical Foundations', thumbnail: 'https://via.placeholder.com/400x220/001133/3399ff?text=Chemistry' },
  { id: 'physics', title: 'Physics', type: 'course', description: 'Laws of Motion', thumbnail: 'https://via.placeholder.com/400x220/003322/00ffcc?text=Physics' }
];

// Initial shorts data pool
const DUMMY_SHORTS = [
  { id: 'short-1', title: 'DNA Double Helix Explained', type: 'short', category: 'Biology', thumbnail: 'https://via.placeholder.com/200x320/221100/ff3333?text=DNA+Helix' },
  { id: 'short-2', title: 'Coanda Effect Demo', type: 'short', category: 'Physics', thumbnail: 'https://via.placeholder.com/200x320/003322/00ffcc?text=Coanda+Effect' },
  { id: 'short-3', title: 'Fun with Alphabets', type: 'short', category: 'Alphabet Fun', thumbnail: 'https://via.placeholder.com/200x320/ff69b4/ffffff?text=Alphabet+Short' }
];

const ChittiContextProvider = (props) => {
  const [userData, setUserData] = useState(null);
  const [builds, setBuilds] = useState([]);
  const [courses, setCourses] = useState(DUMMY_COURSES);
  const [shorts, setShorts] = useState(DUMMY_SHORTS);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedGrade, setSelectedGrade] = useState(
    () => localStorage.getItem('selected-grade') || 'Class 1 to 4'
  );

  const updateSelectedGrade = (grade) => {
    setSelectedGrade(grade);
    localStorage.setItem('selected-grade', grade);
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const response = await fetch(`${import.meta.env.VITE_ALCB_API_URL}/getuserdata`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
        });

        if (!response.ok) return;
        const data = await response.json();
        if (data.success) setUserData(data.user);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      }
    }
  };

  const fetchAllBuilds = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_ALCB_API_URL}/getAllBuilds`);
      if (!response.ok) return;
      const data = await response.json();
      if (data.success) setBuilds(data.builds);
    } catch (err) {
      console.error('Failed to fetch builds:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    setUserData(null);
  };

  useEffect(() => {
    fetchAllBuilds();
    fetchUserData();
  }, []);

  const contextValue = {
    userData,
    builds,
    courses,
    shorts,
    searchQuery,
    setSearchQuery,
    fetchUserData,
    fetchAllBuilds,
    logout,
    selectedGrade,
    setSelectedGrade: updateSelectedGrade,
    gradeOptions: GRADE_OPTIONS,
  };

  return (
    <ChittiContext.Provider value={contextValue}>
      {props.children}
    </ChittiContext.Provider>
  );
};

export default ChittiContextProvider;