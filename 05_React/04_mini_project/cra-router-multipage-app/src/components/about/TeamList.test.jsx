import { render, screen } from '@testing-library/react';
import TeamList from './TeamList';

test('renders team list entries', () => {
  render(<TeamList />);
  expect(screen.getByText(/frontend engineer/i)).toBeInTheDocument();
  expect(screen.getByText(/qa engineer/i)).toBeInTheDocument();
});
