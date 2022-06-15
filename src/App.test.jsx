import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import Containers from './cards';

test('Check if form and button are on the screen and veryifying the type', async () => {
  render(<App />);
  const input = screen.getByRole('textbox', {
    placeholder: /fresno, ca/i,
  });
  const searchBtn = screen.getByRole('button');
  // verifying that the input and button exist
  expect(input).toBeInTheDocument();
  expect(searchBtn).toBeInTheDocument();
  // veryifing search button type and user data for input field
  expect(input).toHaveAttribute('type', 'text');
  expect(searchBtn).toHaveAttribute('type', 'submit');
});

test('if cards are displayed and showing data', async () => {
  render(<App />);
  const cards = await screen.queryByTestId('button_0');
  await (() => expect.toBeInTheDocument(cards));
});
