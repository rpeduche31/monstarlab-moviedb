import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

//COMPONENTS
import NavBar from '../../Components/common/Navbar';
import MovieLists from './MovieLists';

//HOOKS
import useGetMovies from '../../Hooks/useMovies';

const Home = () => {
	const history = useHistory();
	const { movie_type } = useParams();
	const { queryMovies } = useGetMovies();
	const [movieCollections, setMovieCollections] = useState([]);

	const startQueryMovie = async (newType) => {
		const queryMoviesResponse = await queryMovies(newType);
		queryMoviesResponse?.length && setMovieCollections(queryMoviesResponse);
	};

	useEffect(() => {
		const newType = movie_type && movie_type.replace('-', '_');
		newType !== 'favorites' && startQueryMovie(newType);
	}, [movie_type]);

	const handleMovieClick = (data) => {
		history.push(`/${movie_type}/${data}`);
	};

	useEffect(() => {
		(movie_type === undefined || movie_type === '/now-playing') &&
			history.push('/now-playing');
	}, []);
	return (
		<>
			<NavBar />

			<MovieLists
				handleMovieClick={handleMovieClick}
				movieCollections={movieCollections}
			/>
			{/* <MoviePreview selectedMovie={selectedMovie} /> */}
		</>
	);
};

export default Home;
