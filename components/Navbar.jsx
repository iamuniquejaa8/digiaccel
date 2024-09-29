"use client";
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { token, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="bg-black p-4 flex justify-between items-center">
      <img 
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" 
        alt="Netflix Logo" 
        className="cursor-pointer h-10" 
        onClick={() => router.push('/')} 
      />

      <div className="space-x-4">
        {token ? (
          <>
            <button
              className="text-white bg-red-800 px-4 py-2 rounded hover:bg-gray-700"
              onClick={() => router.push('/favourites')}
            >
              Favourites
            </button>
            <button
              className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-500"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            onClick={() => router.push('/login')}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
