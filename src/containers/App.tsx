import React from "react";
import SignIn from "../containers/SignIn/SignIn";
import SignUp from "../containers/SignUp/Signup";
import { useSelector } from "react-redux";
import { IRootState } from "../index";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";
import Layout from "../components/Navigation/layout";

interface IProtectedRoute {
	Component?: any;
	path?: string | string[];
	exact?: boolean;
}

const LoggedInRoute = ({ Component, exact, path }: IProtectedRoute) => {
	const isAuthenticated = useSelector<IRootState, boolean | undefined>(
		(state) => state.auth.loggedIn
	);

	return (
		<Route
			exact={exact}
			path={path}
			render={() => {
				console.log(isAuthenticated);
				if (isAuthenticated === true) {
					return <Component />;
				} else {
					return (
						<Redirect
							to={{
								pathname: "/",
							}}
						/>
					);
				}
			}}
		/>
	);
};

const LoggedOutRoute = ({ Component, exact, path }: IProtectedRoute) => {
	const isAuthenticated = useSelector<IRootState, boolean | undefined>(
		(state) => state.auth.loggedIn
	);

	return (
		<Route
			exact={exact}
			path={path}
			render={() => {
				console.log(isAuthenticated);
				if (isAuthenticated === false) {
					return <Component />;
				} else {
					return (
						<Redirect
							to={{
								pathname: "/dashboard",
							}}
						/>
					);
				}
			}}
		/>
	);
};

function App() {
	const Index = () => <Layout />;

	const DashBoard = () => (
		<Layout>
			<h1>logged in </h1>
		</Layout>
	);

	const Settings = () => (
		<Layout>
			<h1>Settings </h1>
		</Layout>
	);
	const Friends = () => (
		<Layout>
			<h1>Friends </h1>
		</Layout>
	);

	return (
		<BrowserRouter>
			<DocumentTitle title="E-Portfolios">
				<Switch>
					<LoggedInRoute
						exact
						path={"/dashBoard"}
						Component={DashBoard}
					/>
					<LoggedInRoute
						exact
						path={"/settings"}
						Component={Settings}
					/>
					<LoggedInRoute
						exact
						path={"/friends"}
						Component={Friends}
					/>

					<LoggedOutRoute exact path={"/"} Component={Index} />

					<LoggedOutRoute
						exact
						path={"/sign-in"}
						Component={SignIn}
					/>
					<LoggedOutRoute
						exact
						path={"/sign-up"}
						Component={SignUp}
					/>
				</Switch>
			</DocumentTitle>
		</BrowserRouter>
	);
}

export default App;
