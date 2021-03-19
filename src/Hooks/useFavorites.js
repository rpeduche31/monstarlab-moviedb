import { useState } from 'react';

const useFavorites = () => {
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const favoritesLocalStorage = localStorage.getItem('favorites')
		? JSON.parse(localStorage.getItem('favorites'))
		: [];

	const findFavorites = async (payload) => {
		const data = await favoritesLocalStorage.filter(
			(res) => payload?.id === res.id
		);

		return data[0]?.id && 'true';
	};

	const addToFavorites = async (payload, action) => {
		setIsLoading(true);

		if (!action) {
			try {
				await localStorage.setItem(
					'favorites',
					JSON.stringify([...favoritesLocalStorage, payload])
				);
				return 'success';
			} catch (err) {
				setError(err);
				setIsLoading(false);
				return 'error';
			}
		} else {
			const filterMovies = favoritesLocalStorage.filter(
				(movie) => movie.id !== payload.id
			);
			try {
				await localStorage.setItem('favorites', JSON.stringify(filterMovies));
				return 'removed';
			} catch (err) {
				setError(err);
				setIsLoading(false);
				return 'error';
			}
		}
	};

	const getAllFavorites = async () => {
		try {
			return await favoritesLocalStorage;
		} catch (err) {
			setError(err);
			setIsLoading(false);
			return 'error';
		}
	};

	return {
		error,
		isLoading,
		addToFavorites,
		findFavorites,
		getAllFavorites,
	};
};

export default useFavorites;
