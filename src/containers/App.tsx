import React from "react";
import SignIn from "../containers/SignIn/SignIn";
import AppBar from "../components/Navigation/appBar";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";

function App() {
	const Home = () => (
		<div>
			<AppBar />
		</div>
	);

	return (
		<BrowserRouter>
			<DocumentTitle title="Upathway - Your Unimelb Study Planner">
				<Switch>
					<Route exact path={"/"} component={Home} />
					<Route exact path={"/sign-up"} component={SignIn} />
				</Switch>
			</DocumentTitle>
		</BrowserRouter>
	);
}

export default App;
