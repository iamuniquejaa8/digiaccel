"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

export default function Favourites() {
  const [movies, setMovies] = useState([]);  // Using 'any[]' for movies
  const { token } = useAuth();

  useEffect(() => {
    // Fetch favorite movies
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/favorites/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      setMovies(response.data);
    })
    .catch((error) => {
      console.error('Error fetching favorites:', error);
    });
  }, [token]);

  const handleRemoveFromFavourites = (movieId) => {  // Assuming movieId is a string
    // Call the API to remove a movie from the favorites
    axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/favorites/${movieId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(() => {
      // Update state to remove the movie from the list
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieId));
    })
    .catch((error) => {
      console.error('Error removing from favorites:', error);
    });
  };

  return (
    <div className="p-2 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {movies.map((movie) => (
        <div key={movie._id} className="bg-gray-800 rounded-md shadow-lg overflow-hidden flex flex-col justify-between">
          <img src={movie.image} alt={movie.title} className="w-full h-60 object-cover" />
          <div className="p-4 flex-grow">
              <h3 className="text-lg font-bold text-white">{movie.title}</h3>
          </div>
          <div className="p-4">
              <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-full text-center"
              onClick={() => handleRemoveFromFavourites(movie._id)}
              >
              Remove from Favourites
              </button>
          </div>
        </div>
      ))}
    </div>
  );
}
