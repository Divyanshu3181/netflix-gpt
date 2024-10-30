import React from 'react';
import { IMG_CDN_URL } from '../utils/constant';

const MovieCard = ({ posterPath }) => {
  if (!posterPath) {
    return (
      <img
        alt='poster'
        src='https://ih1.redbubble.net/image.4905811447.8675/flat,750x,075,f-pad,750x1000,f8f8f8.jpg'
        className='w-36 md:w-48 rounded-lg'
      />
    );
  }

  return (
    <div className='w-48 pr-4 transform hover:scale-110 transition-transform duration-100'>
      <img
        alt='Movie Card'
        className='rounded-lg'
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  );
};

export default MovieCard;
