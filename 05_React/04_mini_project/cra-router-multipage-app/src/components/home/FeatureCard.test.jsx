import { render, screen } from '@testing-library/react';
import FeatureCard from './FeatureCard';

test('renders feature card content', () => {
  render(<FeatureCard heading="Routing" description="Router details" />);
  expect(screen.getByText('Routing')).toBeInTheDocument();
  expect(screen.getByText('Router details')).toBeInTheDocument();
});
