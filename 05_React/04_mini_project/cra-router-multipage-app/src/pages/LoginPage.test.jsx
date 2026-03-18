import { fireEvent, render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

test('renders login page and submits valid form', () => {
  render(<LoginPage />);
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '1234' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText(/login submitted successfully/i)).toBeInTheDocument();
});
