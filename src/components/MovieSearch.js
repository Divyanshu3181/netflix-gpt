import React from 'react'
import SearchBar from './SearchBar'
import MovieSuggestion from './MovieSuggestion'
import { BackGroundLogo } from '../utils/constant';

const MovieSearch = () => {
  return (
    <div >

      <div className='fixed -z-10'>
        <img
          className='h-screen w-screen object-cover '
          alt='Background'
          src={BackGroundLogo}
        />
      </div>


      <div >
        <SearchBar />
        <MovieSuggestion />
      </div>
    </div>
  )
}

export default MovieSearch