import React from 'react';
import {Provider} from 'react-redux';
import {mount, configure} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SignInForm from '../components/AuthDialogs';
import Adapter from 'enzyme-adapter-react-16';
import {TextField, Button} from '@material-ui/core';

configure({adapter: new Adapter()});
const mockStore = configureMockStore([thunk]);

describe('Login tests', () => {
    const store = mockStore({});
    const wrapper = mount(
        <Provider store={store}>
            <SignInForm />
        </Provider>
    );
    it('should have login button and forget password button', () => {
        expect(wrapper.find(Button).length).toEqual(2);
    });

    it('should render the form', () => {
        expect(wrapper.find(TextField).length).toEqual(2);
    });
});
