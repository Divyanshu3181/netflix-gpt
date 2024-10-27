import React from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTMovieSuggestion from './GPTMovieSuggestion'
import { BackGroundLogo } from '../utils/constant';

const GPTSearch = () => {
  return (
    <div>
        <div className='absolute -z-10'>
            <img alt='Logo' src={BackGroundLogo} />
        </div>
        <GPTSearchBar />
        <GPTMovieSuggestion />
    </div>
  )
}

export default GPTSearch