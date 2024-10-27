import { useDispatch } from "react-redux";
import { API_OPTIONS } from '../utils/constant'
import {addUpcomingMovies} from "../utils/moviesSlice"
import React, { useEffect } from 'react'

const useUpcomingMovies = () => {
    

  //Fetch data from TMDB API and update store
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS);
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  };

  useEffect(() => {
    getUpcomingMovies();
  }, [])
};

export default useUpcomingMovies;