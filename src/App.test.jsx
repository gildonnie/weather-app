import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('Check if form and button are on the screen and button is disabled', async () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  const searchBtn = screen.getByRole('button');

  expect(input).toBeInTheDocument();
  expect(searchBtn).toBeInTheDocument();
  expect(searchBtn).toBeDisabled();
});

// test('Have a user input a location into the form and button enables')
