import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies);
  return (
    movies.nowPlayingMovies && (
      <div className='bg-black scrollbar-hide'>
        <div className='m-0 md:-mt-52 pl-4 md:pl-11 relative z-20' >
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Popular"} movies={movies.PopularMovies} />
          <MovieList title={"Top Rated"} movies={movies.TopRatedMovies} />
          <MovieList title={"Upcoming Movies"} movies={movies.UpcomingMovies} />


        </div>

      </div>
    )
  );
}

export default SecondaryContainer;