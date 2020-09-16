import React from 'react';
import {Provider} from 'react-redux';
import {mount, configure} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Editor from './Editor';
import {Button} from '@material-ui/core';
import EmailEditor from 'react-email-editor';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});
const mockStore = configureMockStore([thunk]);

describe('Editor rendering tests', () => {
    const store = mockStore({});
    const wrapper = mount(
        <Provider store={store}>
            <Editor />
        </Provider>
    );
    it('should have save button', () => {
        expect(wrapper.find(Button).length).toEqual(1);
    });

    it('should render the editor', () => {
        expect(wrapper.find(EmailEditor).length).toEqual(1);
    });
});
