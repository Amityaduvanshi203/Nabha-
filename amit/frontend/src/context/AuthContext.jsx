import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userClass, setUserClass] = useState('');

  useEffect(() => {
    // Check localStorage on component mount
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('userRole') || '';
    const email = localStorage.getItem('userEmail') || '';
    const userClass = localStorage.getItem('userClass') || '';
    
    setIsLoggedIn(loggedIn);
    setUserRole(role);
    setUserEmail(email);
    setUserClass(userClass);
  }, []);

  const login = (role, email, selectedClass = '') => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserEmail(email);
    setUserClass(selectedClass);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);
    if (selectedClass) {
      localStorage.setItem('userClass', selectedClass);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    setUserEmail('');
    setUserClass('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userClass');
  };

  const value = {
    isLoggedIn,
    userRole,
    userEmail,
    userClass,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
