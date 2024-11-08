import React, { useRef, useState } from 'react';
import lang from '../utils/languageConstant';
import { useSelector, useDispatch } from 'react-redux';
import { changeLanguage } from '../utils/configSlice';
import { API_OPTIONS, SUPPORTED_LANGUAGES } from '../utils/constant';
import { addSearchMovieResult } from '../utils/searchSlice';
import Shimmer from './Shimmer';


const SearchBar = () => {
    const dispatch = useDispatch();
    const searchText = useRef(null);
    const [isSearching, setIsSearching] = useState(false);

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    };


    const handleMovieSearchClick = async () => {
        setIsSearching(true);
        const movieQuery = searchText.current.value;
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" +
            movieQuery +
            "&include_adult=false&language=en-US&page=1",
            API_OPTIONS
        );
        const json = await data.json();
        const tmdbResults = json.results;


        dispatch(addSearchMovieResult(tmdbResults));
        setIsSearching(false);



    }

    const langKey = useSelector((store) => store.config.lang);
    
    

    return (
        <>
        
        <div className="pt-[40%] md:pt-[10%] px-4 md:px-0">
            <form
                className="w-full md:w-3/4 lg:w-1/2 mx-auto bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg"
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="flex flex-col md:flex-row gap-4">

                    <input
                        ref={searchText}
                        type="text"
                        className="flex-grow p-3 rounded-lg bg-gray-100 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-600"
                        placeholder={lang[langKey].MovieSearchPlaceholder}
                    />

                    <div className="flex flex-row gap-4 justify-center md:justify-end">

                        <button
                            type="submit"
                            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 whitespace-nowrap"
                            onClick={handleMovieSearchClick}
                        >
                            {lang[langKey].search}
                        </button>


                        <select
                            className="rounded-lg bg-amber-700 px-2 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                            onChange={handleLanguageChange}
                        >
                            {SUPPORTED_LANGUAGES.map((lang) => (
                                <option key={lang.identifier} value={lang.identifier}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
            </form>
            
        </div>
        {isSearching && <Shimmer />}
        </>
    );
};

export default SearchBar;
