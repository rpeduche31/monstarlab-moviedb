import React, { useEffect, Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from '../src/Pages/Home';
import DetailsScreen from '../src/Pages/DetailsScreen';

function App() {
	return (
		<Fragment>
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/:movie_type">
						<Home />
					</Route>
					<Route exact path="/:movie_type/:movie_id">
						<DetailsScreen />
					</Route>
				</Switch>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;
