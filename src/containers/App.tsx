import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import {IRootState} from '../index';
import DocumentTitle from 'react-document-title';
import {SnackbarProvider} from 'notistack';

import Layout from '../components/Navigation';
import theme from '../theme/fortyTwo';

import Explore from '../containers/Explore';

import {
    Editor,
    ForgetPassword,
    HomePage,
    ProfilePage,
    Recovery,
    Search,
    Setting,
    Verify,
    NotFound,
} from '.';

interface IProtectedRoute {
    Component?: any;
    path?: string | string[];
    exact?: boolean;
}

const LoggedInRoute = ({Component, exact, path}: IProtectedRoute) => {
    const isAuthenticated = useSelector<IRootState, boolean | undefined>(
        (state) => state.auth.loggedIn
    );

    return (
        <Route
            exact={exact}
            path={path}
            render={() => {
                // console.log("isAuthenticated", isAuthenticated);
                if (isAuthenticated === true) {
                    return <Component />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/',
                            }}
                        />
                    );
                }
            }}
        />
    );
};

const LoggedOutRoute = ({Component, exact, path}: IProtectedRoute) => {
    const isAuthenticated = useSelector<IRootState, boolean | undefined>(
        (state) => state.auth.loggedIn
    );

    return (
        <Route
            exact={exact}
            path={path}
            render={() => {
                // console.log("isAuthenticated", isAuthenticated);
                if (isAuthenticated === false) {
                    return <Component />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/settings',
                            }}
                        />
                    );
                }
            }}
        />
    );
};

function App() {
    const EditorBoard = () => (
        <div>
            <Layout>
                <Editor />
            </Layout>
        </div>
    );

    const Settings = () => (
        <Layout>
            <Setting />
        </Layout>
    );

    return (
        <BrowserRouter>
            <DocumentTitle title="FortyTwo">
                <ThemeProvider theme={theme}>
                    <SnackbarProvider maxSnack={5}>
                        <Switch>
                            <Route
                                exact
                                path={'/portfolio/:username'}
                                component={ProfilePage}
                            />
                            <Route exact path={'/search'} component={Search} />
                            <Route
                                exact
                                path={'/verification/verify'}
                                component={Verify}
                            />
                            <Route
                                exact
                                path={'/authentication/password-recovery'}
                                component={Recovery}
                            />
                            <Route
                                exact
                                path={'/forget-password'}
                                component={ForgetPassword}
                            />
                            <LoggedInRoute
                                exact
                                path={'/editor'}
                                Component={EditorBoard}
                            />
                            <LoggedInRoute
                                path={'/explore'}
                                Component={Explore}
                            />
                            <LoggedInRoute
                                exact
                                path={'/settings'}
                                Component={Settings}
                            />
                            <Route exact path={'/'} component={HomePage} />
                            <Route
                                exact
                                path={'/notfound'}
                                component={NotFound}
                            />
                            <Redirect push to="/notfound" />
                        </Switch>
                    </SnackbarProvider>
                </ThemeProvider>
            </DocumentTitle>
        </BrowserRouter>
    );
}

export default App;
