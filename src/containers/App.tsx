import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import {IRootState} from '../index';
import DocumentTitle from 'react-document-title';
import {SnackbarProvider} from 'notistack';

import Layout from '../components/Navigation';
import theme from '../theme/fortyTwo';

import {useDispatch} from 'react-redux';
import {userActions} from '../store/actions/userActions';

import {
    Explore,
    ForgetPassword,
    Home,
    Recovery,
    Verify,
    Editor,
    Setting,
    HomePage,
    ProfilePage,
} from '.';

import JwtDecode from 'jwt-decode';

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
    const dispatch = useDispatch();
    // check if stored token is still valid
    const token = useSelector<IRootState, string | null | undefined>(
        (state) => state.auth.token
    );
    if (token !== null && token !== undefined) {
        const jwt = JwtDecode(token);
        const current_time = Date.now() / 1000;
        if ((jwt as any).exp < current_time) {
            /* expired */
            dispatch(userActions.logout());
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }

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
                                path={'/profile'}
                                component={ProfilePage}
                            />
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
                                exact
                                path={'/settings'}
                                Component={Settings}
                            />
                            <LoggedInRoute
                                path={'/explore'}
                                Component={Explore}
                            />
                            <LoggedOutRoute path={'/'} Component={HomePage} />
                        </Switch>
                    </SnackbarProvider>
                </ThemeProvider>
            </DocumentTitle>
        </BrowserRouter>
    );
}

export default App;
