import { render, screen } from '@testing-library/react';
import AboutPage from './AboutPage';

test('renders about page with all sections', () => {
  render(<AboutPage />);
  expect(screen.getByText(/about/i)).toBeInTheDocument();
  expect(screen.getByText(/mission/i)).toBeInTheDocument();
  expect(screen.getByText(/team/i)).toBeInTheDocument();
  expect(screen.getByText(/timeline/i)).toBeInTheDocument();
  expect(screen.getByText(/core values/i)).toBeInTheDocument();
});
