import * as React from 'react';
import {render} from '../utils/test-utils';

import SignInForm from '../components/AuthDialogs/SignInForm';

test('render the correct content', () => {
    const {getByText} = render(<SignInForm />);
    getByText(/Welcome Back/);
    getByText('Username');
    getByText('Password');
    getByText('Sign in');
    getByText('Sign up');
    getByText('Forgot password?');
});
