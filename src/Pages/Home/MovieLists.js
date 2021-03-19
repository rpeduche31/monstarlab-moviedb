import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Input } from 'antd';

//HOOKS
import useGetMovies from '../../Hooks/useMovies';
import useFavorites from '../../Hooks/useFavorites';

const { Search } = Input;

const MovieListsContainer = styled.div`
	height: 100vh;
	overflow-x: auto;
	overflow-y: unset;
	width: 100%;
	position: relative;
	background: #252323;
	.movie-card-container {
		padding: 0 15px;

		display: grid;
		display: grid;
		grid-template-columns: repeat(auto-fill, 210px);
		grid-row-gap: 55px;
		grid-gap: 45px;
		position: relative;
	}
`;

const Divider = styled.div`
	margin-top: 160px;
`;

const DividerBottom = styled.div`
	margin-bottom: 15px;
`;

const MovieCardContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	cursor: pointer;
	transition: all 0.4s ease;

	.blurred-holder {
		visibility: hidden;
		height: 100%;
		width: 100%;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 3px;
		color: white;
		font-size: 20px;
		font-weight: bold;
		letter-spacing: 0.7px;
		transition: all 0.4s ease;
	}
	&:hover {
		transform: scale(1.02);
		.blurred-holder {
			visibility: visible;
			background-color: #00000075;
			transition: all 0.4s ease;
		}
		transition: all 0.9s ease;
	}
	.movie-poster {
		height: 100%;
		width: 100%;
		border-radius: 3px;
		cursor: pointer;
	}
`;

const SearchHolder = styled.div`
	position: fixed;
	top: 65px;
	z-index: 10;
	height: 80px;
	width: 59%;
	display: flex;
	align-items: center;
	justify-content: center;
	.ant-input-group-wrapper,
	.ant-input-search {
		height: 70%;
		background: white;
		box-shadow: 10px 10px;
	}
	.ant-input-wrapper,
	.ant-input-group {
		height: 100%;
	}
	.ant-input-affix-wrapper,
	.ant-input-affix-wrapper-borderless {
		height: 100%;
		width: 100%;
		background: white;
	}
	.ant-input,
	.ant-input-borderless {
		background: white;
		font-size: 18px;
		text-indent: 15px;
	}
	.ant-input-group-addon {
		height: 100%;
		width: 10%;
	}
	.ant-btn,
	.ant-btn-icon-only,
	.ant-input-search-button {
		height: 100%;
		width: 100%;
		border: none;
		border-left: 2px solid gainsboro;
		border-radius: 0 !important;
		&:active {
			background: gray;
		}
	}
`;

const FloatingLabelContainer = styled.div`
	position: fixed;
	top: 150px;
	right: 30px;

	z-index: 15;
	writing-mode: vertical-rl;
	text-orientation: upright;

	font-size: 38px;

	text-align: center;

	padding: 15px;
	font-weight: 900;
	border-radius: 55px;
	box-shadow: 10px 10px black;
	text-shadow: -7px 6px black;
	color: #00ffdc;
`;

const MovieCard = ({ movieCollections, handleMovieClick }) => {
	return movieCollections.map((movie) => (
		<MovieCardContainer
			onClick={() => handleMovieClick(movie.id)}
			key={movie.id}
		>
			{movie?.poster_path ? (
				<img
					className="movie-poster"
					src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
				/>
			) : (
				<span style={{ color: 'white' }}>No Image Available</span>
			)}

			<div className="blurred-holder">Click to Preview</div>
		</MovieCardContainer>
	));
};

const FloatingLabel = ({ movieType }) => {
	const newMovieType = movieType && movieType.replace('-', ' ');

	return (
		<FloatingLabelContainer>
			<span>{newMovieType?.toUpperCase()}</span>
		</FloatingLabelContainer>
	);
};

export default ({ movieCollections, handleMovieClick }) => {
	const { searchMovie } = useGetMovies();
	const [searchedMovies, setSearchedMovies] = useState([]);
	const [searchedMovieTitle, setSerachedMovieTitle] = useState('');
	const { movie_type } = useParams();
	const { getAllFavorites } = useFavorites();
	const [movieFavorites, setMovieFavorites] = useState([]);

	const handleSearch = async (query) => {
		const data = await searchMovie(query);
		setSerachedMovieTitle(query);
		setSearchedMovies(data);
	};

	const handleGetAllFavorites = async () => {
		const data = await getAllFavorites();
		setMovieFavorites(data);
	};

	useEffect(() => {
		movie_type === 'favorites' && handleGetAllFavorites();
	}, [movie_type]);

	return (
		<MovieListsContainer>
			<Divider />

			<div className="movie-card-container">
				<SearchHolder>
					<Search
						onChange={(text) => handleSearch(text.target.value)}
						allowClear
						placeholder="Search Movie"
						bordered={false}
					/>
				</SearchHolder>

				{movieFavorites?.length ||
				searchedMovies?.length ||
				movieCollections?.length ? (
					<MovieCard
						handleMovieClick={handleMovieClick}
						movieCollections={
							movie_type === 'favorites'
								? movieFavorites
								: searchedMovies?.length
								? searchedMovies
								: movieCollections
						}
					/>
				) : (
					<div style={{ color: 'white' }}>No Movie Results</div>
				)}
			</div>
			<FloatingLabel movieType={movie_type} />
			<DividerBottom />
		</MovieListsContainer>
	);
};
