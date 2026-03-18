import { render, screen } from '@testing-library/react';
import Timeline from './Timeline';

test('renders timeline milestones', () => {
  render(<Timeline />);
  expect(screen.getByText(/project kickoff/i)).toBeInTheDocument();
  expect(screen.getByText(/testing completion/i)).toBeInTheDocument();
});
