import React, { createContext, useEffect, useState } from 'react';

export const ChittiContext = createContext(null);

const ChittiContextProvider = (props) => 
  {
  const [userData, setUserData] = useState(null);
  const [builds, setBuilds] = useState([]);

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

        const data = await response.json();
        if (data.success) {
          setUserData(data.user);
        }
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      }
    }
  };

  const fetchAllBuilds = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_ALCB_API_URL}/getAllBuilds`);
      const data = await response.json();
      if (data.success) {
        setBuilds(data.builds);
      }
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
    fetchUserData,
    fetchAllBuilds,
    logout,
  };

  return (
    <ChittiContext.Provider value={contextValue}>
      {props.children}
    </ChittiContext.Provider>
  );
};

export default ChittiContextProvider;