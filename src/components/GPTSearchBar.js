import React from 'react';
import lang from '../utils/languageConstant';
import { useSelector, useDispatch } from 'react-redux';
import { changeLanguage } from '../utils/configSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constant';

const GPTSearchBar = () => {
    const dispatch = useDispatch();

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    };

    const langKey = useSelector((store) => store.config.lang);

    return (
        <div className="pt-[10%] flex justify-center">
            <form className="w-3/4 md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-4">
                {/* Search Input */}
                <input
                    type="text"
                    className="flex-grow p-3 rounded-lg bg-gray-100 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-600"
                    placeholder={lang[langKey].GPTSearchPlaceholder}
                />

                {/* Search Button */}
                <button
                    type="submit"
                    className="py-3 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    {lang[langKey].search}
                </button>
                {/* Language Select Dropdown */}
                <select
                    className="rounded-lg bg-amber-700 p-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    onChange={handleLanguageChange}
                >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                        <option key={lang.identifier} value={lang.identifier}>
                            {lang.name}
                        </option>
                    ))}
                </select>


            </form>
        </div>
    );
};

export default GPTSearchBar;
