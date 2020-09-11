import React from 'react';
import { Provider } from 'react-redux';
import { mount, configure } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SignUp from '../components/AuthDialogs/signUpForm';
import Adapter from 'enzyme-adapter-react-16';
import { TextField, Button } from '@material-ui/core';
import PhoneInput from 'react-phone-input-2';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

describe('Login tests', () => {
    const store = mockStore({});
    const wrapper = mount(
        <Provider store={store}>
            <SignUp />
        </Provider>
    );
    it('should have signup button', () => {
        expect(wrapper.find(Button).length).toEqual(1);
    });

    it('should render the form', () => {
        expect(wrapper.find(TextField).length).toEqual(7);
    });

    it('should render the phone input', () => {
        expect(wrapper.find(PhoneInput).length).toEqual(1);
    });
});
