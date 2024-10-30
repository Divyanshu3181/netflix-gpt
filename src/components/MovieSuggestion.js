import React from 'react';
import { useSelector } from 'react-redux';

const MovieSuggestion = () => {
  const movieResult = useSelector((store) => store.search.movieResult);

  if (!movieResult) return null;

  return (
    <div className='p-6 m-6 bg-opacity-70 text-white rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {movieResult.map((movie, index) => (
        <div
          key={movie.id || index}
          className='bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300'
        >
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://ih1.redbubble.net/image.4905811447.8675/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"}
            alt={movie.title}
            className='w-full h-65 object-cover'
          />
          <div className='p-4'>
            <h2 className='text-lg font-semibold mb-2 text-center'>{movie.title || `Search Result ${index + 1}`}</h2>
            <p className='text-sm text-gray-300 line-clamp-3'>{movie.overview ? movie.overview.substring(0, 100) : "No description available"}...</p>
            <p className='mt-2 text-yellow-400 font-bold'>{movie.vote_average}/10</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieSuggestion;
