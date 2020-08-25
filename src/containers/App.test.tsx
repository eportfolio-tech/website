import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('dummy test, avoid failure', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/2020/i);
  expect(linkElement).toBeInTheDocument();
});
