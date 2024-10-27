import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { Logo, SUPPORTED_LANGUAGES, USER_AVTAR } from '../utils/constant';
import { toggleGPTSearchView } from '../utils/gptSlice';


const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
      })
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
          }));
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });

    // Unsubscrive when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGPTSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGPTSearchView());
  }


  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center'>
      <img
        className='w-44'
        src={Logo}
        alt='Logo'
      />
      {user && (
        <div className='flex items-center space-x-4'>
          
        <button className='px-4 py-2 mx-4 my-2 rounded-lg bg-purple-800 text-white' 
        onClick={handleGPTSearchClick}
        >{showGPTSearch ? "Home" : "GPT Search"}</button>
        <img
          className='w-12 h-12 rounded-lg'
          alt='usericon'
          src={user?.photoURL}
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
