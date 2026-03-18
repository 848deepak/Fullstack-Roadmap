import { render, screen } from '@testing-library/react';
import ValuesGrid from './ValuesGrid';

test('renders all values', () => {
  render(<ValuesGrid />);
  expect(screen.getByText(/clarity/i)).toBeInTheDocument();
  expect(screen.getByText(/reusability/i)).toBeInTheDocument();
  expect(screen.getByText(/testing/i)).toBeInTheDocument();
  expect(screen.getByText(/learning/i)).toBeInTheDocument();
});
