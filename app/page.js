"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '@/components/MovieCard';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/`)
    .then((response) => {
      console.log(response.data);
      setMovies(response.data);
    })
    .catch((error) => {
      console.error('Error')
    })
  },[])

  return (
      <div className="p-2 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
  );
}
