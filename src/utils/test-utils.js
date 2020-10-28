import React from 'react';
import {render} from '@testing-library/react';

import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';

import {alertReducer} from '../store/reducers/alertReducers';
import {authenticationReducer} from '../store/reducers/authReducers';
import {pageReducer} from '../store/reducers/pageReducers';

const AllTheProviders = ({children}) => {
    const store = createStore(
        combineReducers({
            alert: alertReducer,
            auth: authenticationReducer,
            page: pageReducer,
        })
    );
    return <Provider store={store}>{children}</Provider>;
};

const customRender = (ui, options) =>
    render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react';

// override render method
export {customRender as render};
