import { render, screen } from '@testing-library/react';
import MissionSection from './MissionSection';

test('renders mission section', () => {
  render(<MissionSection />);
  expect(screen.getByText(/mission/i)).toBeInTheDocument();
});
