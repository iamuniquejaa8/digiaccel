"use client"
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';


const AuthContext = createContext();



export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  // Check for token and user ID in localStorage when the app loads
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUserId = localStorage.getItem('user_id');
    if (savedToken && savedUserId) {
      setToken(savedToken);
      setUserId(savedUserId);
    }
  }, []);

  const login = (receivedUserId, receivedToken) => {
    localStorage.setItem('token', receivedToken);
    localStorage.setItem('user_id', receivedUserId);
    setToken(receivedToken);
    setUserId(receivedUserId);
    router.push('/'); // Redirect to Home after login
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setToken(null);
    setUserId(null);
    router.push('/login'); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
