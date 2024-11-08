import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { Logo } from '../utils/constant';
import { toggleSearchView } from '../utils/searchSlice';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const showMovieSearch = useSelector((store) => store.search.showMovieSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => { })
      .catch((error) => {
        console.error("Sign-out error:", error);
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleMovieSearchClick = () => {
    dispatch(toggleSearchView());
  };

  return (
    <div className='absolute w-full px-8 py-4 bg-gradient-to-b from-black to-transparent z-10 flex flex-col md:flex-row md:justify-between items-center'>

      <img className='w-36 cursor-pointer transition-transform transform hover:scale-105' src={Logo} alt='Logo' onClick={() => navigate('/')} />


      {user && (
        <div className='flex items-center space-x-6 mt-4 md:mt-0'>

          <button
            className='px-6 py-2 rounded-lg bg-purple-700 text-white hover:bg-purple-600 transition duration-200 shadow-md'
            onClick={handleMovieSearchClick}
          >
            {showMovieSearch ? "Home" : "Movie Search"}
          </button>


          <div className='flex items-center space-x-4'>
            <img
              className='w-12 h-12 rounded-lg border-2 border-gray-300 shadow-lg object-cover'
              alt='user icon'
              src={user?.photoURL || "https://via.placeholder.com/150"}
            />
            <button
              onClick={handleSignOut}
              className='text-sm text-gray-300 hover:text-red-500 font-semibold transition duration-200'
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
