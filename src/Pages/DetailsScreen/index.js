import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

//COMPONENTS
import NavBar from '../../Components/common/Navbar';

//HOOKS
import useGetMovies from '../../Hooks/useMovies';
import useFavorites from '../../Hooks/useFavorites';

//ASSETS
import Star from '../../Assets/icons/star.png';
import Time from '../../Assets/icons/time.png';
import Favorite from '../../Assets/icons/favorite.png';
import Bookmark from '../../Assets/icons/bookmark.png';

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
	background-image: url(${(props) =>
		`https://image.tmdb.org/t/p/original${props.bgimage}`});

	filter: blur(8px);

	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	background-color: black;
`;

const MovieMainDetailsContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 10;
	display: flex;

	flex-direction: column;
	align-items: center;
	.iframe-holder {
		width: 75%;
		display: flex;

		justify-content: center;
		iframe {
			width: 80% !important;
		}
	}
	.lower-info-holder {
		width: 65%;
		display: flex;

		justify-content: space-between;
		.genre-holder {
			width: 50%;
			margin: 2px 15px 0 15px;
			display: flex;
			align-items: center;
			span {
				padding: 5px 20px;
				color: #656363;
				font-size: 14px;
				font-weight: 600;
			}
		}
		.rate-runtime-favorite {

			display: flex;
			background:#ff00f72b;
			align-items:center;
			justify-content:center;
			margin-top:10px;
			padding: 10px 20px;
    		margin-right: 35px;
			border-radius:4px;
			.rate-holder,
			.runtime-holder {
				display: flex;
				align-items: center;
				margin-right: 15px;
				.rate-star,
				.runtime-clock {
					height: 15px;
					margin-right: 5px;
				}
			}
			.favorite-holder {
				display: flex;
				align-items: center;
				position: relative;
				&:hover {
					.tool-tip-favorites {
						visibility: visible;
					}
				}
				.favorite-icon {

					height: 40px;
					cursor: pointer;


				}
				.tool-tip-favorites {
					position: absolute;
					visibility: hidden;
					color: white;
					width: 130px;
					background: #00000047;
					right: -130px;
					text-align: center;
					padding: 5px; 2px;
					border-radius:4px;
				}
			}

			span {
				color: white;
				font-size: 14px;
				font-weight: 600;
			}
		}
	}
	.lowest-info-holder{
		width: 60%;
		display: flex;
		flex-direction:column;
		.title-tagline{
			.title-tagline-title{
				font-size:24px;
				color:white;
				font-weight:bolder;
				margin-right:25px;
			}
			.title-tagline-tagline{
				font-size:13px;
				color:white;
			}
		}
		.overview{
			margin-top:20px;
			.overview-desk{
				color:white;
			}
		}
	}
`;

const BlackBg = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background: #000000bf;
`;

const Divider = styled.div`
	margin-top: 55px;
`;

const BlackPillars = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: absolute;
	top: 0;
	left: 0;
	div {
		height: 100%;
		width: 150px;
		background-color: black;
	}
`;

const MovieMainDetails = ({ movieDetailsData }) => {
	const { addToFavorites, findFavorites } = useFavorites();
	const [actionFavorite, setActionFavorite] = useState(false);

	const handleAddToFavorites = async () => {
		const data =
			movieDetailsData &&
			(await addToFavorites(movieDetailsData, actionFavorite));
		setActionFavorite(data === 'success' ? true : false);
	};

	const handleCheckMovie = async () => {
		const checkMovie = await findFavorites(movieDetailsData);
		checkMovie === 'true' && setActionFavorite(true);
	};

	useEffect(() => {
		movieDetailsData && handleCheckMovie();
	}, [movieDetailsData]);

	return (
		<MovieMainDetailsContainer>
			<Divider />
			<div className="iframe-holder">
				<iframe
					height="420"
					src={`https://www.youtube.com/embed/${movieDetailsData?.videoRes?.results[0]?.key}`}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen="true"
					modestbranding="1"
					showInfo="0"
				/>
			</div>
			<div className="lower-info-holder">
				<div className="genre-holder">
					{movieDetailsData?.genres?.map((details) => (
						<span key={details.name}>{details?.name}</span>
					))}
				</div>
				<div className="rate-runtime-favorite">
					<div className="rate-holder">
						<img className="rate-star" src={Star} />
						<span>{movieDetailsData?.vote_average}</span>
					</div>
					<div className="runtime-holder">
						<img className="runtime-clock" src={Time} />
						<span>
							{Math.trunc(movieDetailsData?.runtime / 60)} hr &{' '}
							{movieDetailsData?.runtime - 60} mins.
						</span>
					</div>
					<div className="favorite-holder">
						<img
							onClick={handleAddToFavorites}
							className="favorite-icon"
							src={actionFavorite ? Bookmark : Favorite}
						/>
						<div className="tool-tip-favorites">Add to favorites</div>
					</div>
				</div>
			</div>
			<div className="lowest-info-holder">
				<div className="title-tagline">
					<span className="title-tagline-title">{movieDetailsData?.title}</span>
					<span className="title-tagline-tagline">
						{movieDetailsData?.tagline}
					</span>
				</div>
				<div className="overview">
					<span className="overview-desk">{movieDetailsData?.overview}</span>
				</div>
			</div>
		</MovieMainDetailsContainer>
	);
};

export default () => {
	const { movie_id } = useParams();
	const { getMovieDetails, getMovieVideo } = useGetMovies();
	const [movieDetailsData, setMovieDetailsData] = useState();

	const fetchMovieDetails = async (movie_id) => {
		const data = await getMovieDetails(movie_id);
		const videoData = await getMovieVideo(movie_id);
		data && videoData && setMovieDetailsData({ ...data, videoRes: videoData });
	};

	useEffect(() => {
		fetchMovieDetails(movie_id);
	}, [movie_id]);

	return (
		<>
			<NavBar />
			<Container bgimage={movieDetailsData?.backdrop_path} />
			<BlackBg />
			<BlackPillars>
				<div />
				<div />
			</BlackPillars>
			<MovieMainDetails movieDetailsData={movieDetailsData} />
		</>
	);
};
