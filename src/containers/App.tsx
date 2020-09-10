import React from 'react';
import SignIn from '../containers/SignIn/SignIn';
import { useSelector } from 'react-redux';
import { IRootState } from '../index';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import Layout from '../components/Navigation/layout';
import { SnackbarProvider } from 'notistack';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme/fortyTwo';

import Index from './Home/home';

import SettingPage from '../containers/Settings/Settings';

import Explore from '../containers/Explore/explore';

import Verify from '../containers/Verify/verify';

import Recovery from '../containers/Recovery/recovery';

import Editor from './Settings/Editor';
//import SignUp from './SignUp/SignUp';

import ForgetPassword from '../containers/ForgetPassword/forgetPassword';

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

const LoggedOutRoute = ({ Component, exact, path }: IProtectedRoute) => {
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
    const DashBoard = () => (
        <Layout>
            <Editor />
        </Layout>
    );

    const Settings = () => (
        <Layout>
            <SettingPage />
        </Layout>
    );

    return (
        <BrowserRouter>
            <DocumentTitle title='FortyTwo'>
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

                            <LoggedOutRoute
                                exact
                                path={'/sign-in'}
                                Component={SignIn}
                            />
                            {/* <LoggedOutRoute
                                exact
                                path={'/sign-up'}
                                Component={SignUp}
                            /> */}
                            <LoggedOutRoute path={'/'} Component={Index} />
                        </Switch>
                    </SnackbarProvider>
                </ThemeProvider>
            </DocumentTitle>
        </BrowserRouter>
    );
}

export default App;
