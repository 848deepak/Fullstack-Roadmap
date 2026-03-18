import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

test('renders home page and loads welcome message from fetch', async () => {
  const fetchMock = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ welcome: 'Fetched welcome message' })
    })
  );
  global.fetch = fetchMock;

  render(<HomePage />);

  expect(await screen.findByText(/fetched welcome message/i)).toBeInTheDocument();

  expect(screen.getByText(/feature highlights/i)).toBeInTheDocument();
  expect(fetchMock).toHaveBeenCalledWith('/mock-data/home.json');

  fetchMock.mockRestore?.();
});
