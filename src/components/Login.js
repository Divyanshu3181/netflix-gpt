import React, { useRef, useState } from 'react';
import Header from './Header';
import checkValidData from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
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
                        photoURL: "https://instagram.fidr1-1.fna.fbcdn.net/v/t51.2885-19/427442020_389523150359053_3815731023128502311_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fidr1-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=OAj7pUiNsN0Q7kNvgHUGnkP&_nc_gid=5123eda271864608b17d5da8e760df0b&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCMdDL1gjSseDE1pw5ML63235rzr6-ic0H1okaO1Jh0Zw&oe=672076E4&_nc_sid=7a9f4b"
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
                        navigate("/browse")
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
                    navigate("/browse")
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
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/74d734ca-0eab-4cd9-871f-bca01823d872/web/IN-en-20241021-TRIFECTA-perspective_2277eb50-9da3-4fdf-adbe-74db0e9ee2cf_large.jpg'
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