import { render, screen } from '@testing-library/react';
import HeroBanner from './HeroBanner';

test('renders hero title and subtitle', () => {
  render(<HeroBanner title="Welcome" subtitle="Subtitle text" />);
  expect(screen.getByText('Welcome')).toBeInTheDocument();
  expect(screen.getByText('Subtitle text')).toBeInTheDocument();
});
