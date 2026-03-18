import { render, screen } from '@testing-library/react';
import StatsPanel from './StatsPanel';

test('renders all stats', () => {
  render(<StatsPanel totalUsers={10} totalProjects={4} testCoverage={90} />);
  expect(screen.getByText(/total users: 10/i)).toBeInTheDocument();
  expect(screen.getByText(/projects built: 4/i)).toBeInTheDocument();
  expect(screen.getByText(/test coverage target: 90%/i)).toBeInTheDocument();
});
