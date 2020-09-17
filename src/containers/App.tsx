import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import {IRootState} from '../index';
import DocumentTitle from 'react-document-title';
import {SnackbarProvider} from 'notistack';

import Layout from '../components/AppBar/Layout';
import theme from '../theme/fortyTwo';

import {authService} from '../utils/authService';
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
                                pathname: '/dashboard',
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
    const user = useSelector<any>((state) => state.auth.user);
    const token = useSelector<any>((state) => state.auth.token);
    if (user !== null) {
        authService
            .getUser((user as any).username, token)
            .then(() => {})
            .catch(() => {
                // if the stored token is expired log out
                dispatch(userActions.logout());
            });
    } else {
        // remove stroage if no user
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    const DashBoard = () => (
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
                                path={'/dashBoard'}
                                Component={DashBoard}
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
                            <LoggedOutRoute path={'/'} Component={Home} />
                        </Switch>
                    </SnackbarProvider>
                </ThemeProvider>
            </DocumentTitle>
        </BrowserRouter>
    );
}

export default App;
