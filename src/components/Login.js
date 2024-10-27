import React, { useRef, useState } from 'react';
import Header from './Header';
import checkValidData from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BackGroundLogo, USER_AVTAR } from '../utils/constant';


const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        // Validate the form data
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;

        //Sign In / Sign Up Logic
        if (!isSignInForm) {
            // Sign Up Logic
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {

                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value , 
                        photoURL: USER_AVTAR
                    })
                    .then(() => {
                        const {uid, email, displayName, photoURL} = auth.currentUser;
                        dispatch(
                            addUser({
                                uid: uid, 
                                email: email, 
                                displayName: displayName, 
                                photoURL: photoURL
                            })
                        ); 
                    })
                    .catch((error) => {
                        setErrorMessage(error.message);
                    });


                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
        else {
            // Sign In Logic
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage("Oops! No account found with this email. Please check or sign up for an account.");
                });

        }

    };

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src= {BackGroundLogo}
                    alt='Logo'
                />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className='absolute p-12 bg-black w-3/12 m-36 mx-auto right-0 left-0 text-white bg-opacity-80'>
                <h1
                    className='font-bold text-3xl py-4'>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm &&
                    <input
                        ref={name}
                        type='text'
                        placeholder='Full Name'
                        className='p-4 my-4 w-full rounded-lg  bg-gray-700'
                    />}
                <input
                    ref={email}
                    type='text'
                    placeholder='Email Adress'
                    className='p-4 my-4 w-full rounded-lg  bg-gray-700'
                />

                <input
                    ref={password}
                    type='password'
                    placeholder='Password'
                    className='p-4 my-4 w-full rounded-lg  bg-gray-700'
                />
                <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
                <button
                    onClick={handleButtonClick}
                    className='p-4 my-6 bg-red-700 w-full rounded-lg'>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p
                    className='py-4 cursor-pointer'
                    onClick={toggleSignInForm}>
                    {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}
                </p>
            </form>

        </div>
    )
}

export default Login