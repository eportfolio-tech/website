import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import {authenticationReducer, IAuthState} from './store/reducers/AuthReducers';
import {alertReducer, IAlertState} from './store/reducers/AlertReducers';
import {userReducer, IUserState} from './store/reducers/UserReducers';

const loggerMiddleware = createLogger();

export interface IRootState {
    alert: IAlertState;
    auth: IAuthState;
    user: IUserState;
}

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create a redux store
const store = createStore<IRootState, any, any, any>(
    combineReducers({
        alert: alertReducer,
        auth: authenticationReducer,
        user: userReducer,
    }),
    composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

ReactDOM.render(
    // <React.StrictMode>
    <Provider store={store}>
        <React.Fragment>
            <App />
        </React.Fragment>
    </Provider>,
    // </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
