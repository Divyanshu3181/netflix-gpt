import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
    return (
        <div className='px-6'>
             <h1 className='text-3xl py-4 text-white'>{title}</h1>
            <div className='flex overflow-x-scroll'>
               <div className='flex'>
                    {movies && movies.length > 0 ? (
                        movies.map((movie, index) => (
                            <MovieCard key={index} posterPath={movie.poster_path} />
                        ))
                    ) : (
                        <p>No movies to display.</p>
                    )}

                </div>
            </div>
        </div>
    );
};

export default MovieList;


