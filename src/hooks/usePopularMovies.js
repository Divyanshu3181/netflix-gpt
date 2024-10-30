import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from '../utils/constant'
import { addPopularMovies} from "../utils/moviesSlice"
import React, { useEffect } from 'react'

const usePopularMovies = () => {
    

  //Fetch data from TMDB API and update store
  const dispatch = useDispatch();

  const popularMovies = useSelector(store => store.movies.PopularMovies)

  const getPopularMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, [])
};

export default usePopularMovies;