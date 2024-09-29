"use client";
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import Link from 'next/link';  // For navigating to Signup page

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const netFlixBackgroundImage = "https://assets.nflxext.com/ffe/siteui/vlv3/bfc0fc46-24f6-4d70-85b3-7799315c01dd/web/IN-en-20240923-TRIFECTA-perspective_74e21c19-980e-45ef-bd6c-78c1a6ce9381_large.jpg";

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, { email, password });
      const { user_id, access_token: token } = response.data;
      login(user_id, token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ 
        backgroundImage: `url(${netFlixBackgroundImage})`, 
        position: 'relative' 
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60" /> {/* Dark overlay */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-3xl text-white mb-6">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="p-2 m-2 border rounded-md w-72 text-black bg-gray-800 border-gray-600 shadow-md hover:shadow-lg transition-all"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 m-2 border rounded-md w-72 text-black bg-gray-800 border-gray-600 shadow-md hover:shadow-lg transition-all"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="p-2 mt-4 bg-red-500 hover:bg-red-700 text-white rounded-md w-72">
          Login
        </button>
        <div className="mt-4">
          <span className="text-white">Not Registered?</span>{' '}
          <Link href="/signup" className="text-red-400 hover:underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
