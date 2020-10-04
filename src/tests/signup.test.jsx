import * as React from 'react';
import {render} from '../utils/test-utils';

import SignUpForm from '../components/AuthDialogs/SignUpForm';

test('render the correct content', () => {
    const {getByText, getAllByText} = render(<SignUpForm />);
    getByText('Enter Details');
    getAllByText(/Title/);
    getByText('Username');
    getByText('First name');
    getByText('Last name');
    getByText('Email Address');
    getByText(/Password/);
    getByText(/^Please re-enter your password$/i);
    getByText('Phone');
    getByText('Please complete sign up form.');
});
