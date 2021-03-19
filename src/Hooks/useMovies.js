import { useState } from 'react';
import axios from 'axios';

const api = 'https://api.themoviedb.org/3';
const apiKey = '32548d48dd18f90a75cfcbdbfa9d7519';

const useGetMovies = () => {
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const queryMovies = async (payload) => {
		setIsLoading(true);
		try {
			const { data } = await axios.get(
				`${api}/movie/${payload}?api_key=${apiKey}&language=en-US&page=1
                `
			);
			setIsLoading(false);

			return data?.results;
		} catch (err) {
			setError(err?.response?.data?.error || err.message || 'Network Error');
			setIsLoading(false);
			return err?.response?.data?.error;
		}
	};

	const searchMovie = async (query) => {
		setIsLoading(true);
		try {
			const { data } = await axios.get(
				`${api}/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false
                `
			);
			setIsLoading(false);

			return data?.results;
		} catch (err) {
			setError(err?.response?.data?.error || err.message || 'Network Error');
			setIsLoading(false);
			return err?.response?.data?.error;
		}
	};

	const getMovieDetails = async (movieId) => {
		setIsLoading(true);
		try {
			const { data } = await axios.get(
				`${api}/movie/${movieId}?api_key=${apiKey}&language=en-US
                `
			);
			setIsLoading(false);
			return data;
		} catch (err) {
			setError(err?.response?.data?.error || err.message || 'Network Error');
			setIsLoading(false);
			return err?.response?.data?.error;
		}
	};

	const getMovieVideo = async (movieId) => {
		setIsLoading(true);
		try {
			const { data } = await axios.get(
				`${api}/movie/${movieId}/videos?api_key=${apiKey}&language=en-US
                `
			);
			setIsLoading(false);
			return data;
		} catch (err) {
			setError(err?.response?.data?.error || err.message || 'Network Error');
			setIsLoading(false);
			return err?.response?.data?.error;
		}
	};

	return {
		error,
		isLoading,
		queryMovies,
		searchMovie,
		getMovieDetails,
		getMovieVideo,
	};
};

export default useGetMovies;
