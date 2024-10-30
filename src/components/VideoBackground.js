import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const MOVIE_ID = 912649;

const VideoBackground = () => {
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
    
    
    useMovieTrailer(MOVIE_ID);

    if (!trailerVideo) return null;

    return (
        <div className='w-screen'>
            <iframe
                className='w-screen aspect-video'
                src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?autoplay=1&mute=1"}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
            />
        </div>
    );
};

export default VideoBackground