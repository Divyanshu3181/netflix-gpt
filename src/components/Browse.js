import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import { useSelector } from 'react-redux';
import MovieSearch from './MovieSearch';


const Browse = () => {

  const showMovieSearch = useSelector((store) => store.search.showMovieSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();


  return (
    <div >
      <Header />
      {
        showMovieSearch ? (
        <MovieSearch /> 
        ):
        (
        <>
            <MainContainer />
            <SecondaryContainer />
        </>)
      }
    </div>
  )
}

export default Browse