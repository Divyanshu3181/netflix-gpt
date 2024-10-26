import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
        navigate("/error");
      });
  };

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center'>
      {/* Left: Logo */}
      <img
        className='w-44'
        src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
        alt='Logo'
      />

      {/* Right: User Icon and Sign Out */}
      {user && (<div className='flex items-center space-x-4'>
        <img
          className='w-12 h-12 rounded-lg'
          alt='usericon'
          src={user?.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJgIipySeIvRN1u-L_a6QxeqmjXbuShSatHys1-2wnHoB6QY1r03kXZxcwFCw_b91N8Hs&usqp=CAU'} // Fallback image
        />
        <button onClick={handleSignOut} className='font-bold text-white'>
          (Sign Out)
        </button>
      </div>
      )}
    </div>
  );
};

export default Header;
