import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Task Manager app', () => {
  render(<App />);
  const heading = screen.getByText('Task Manager');
  expect(heading).toBeInTheDocument();
});

