import { fireEvent, render, screen } from '@testing-library/react';
import RegisterPage from './RegisterPage';

test('renders register page and submits valid form', () => {
  render(<RegisterPage />);
  fireEvent.change(screen.getByLabelText(/^name$/i), { target: { value: 'User' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'u@x.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'abcd' } });
  fireEvent.click(screen.getByRole('button', { name: /create account/i }));
  expect(screen.getByText(/registered: user/i)).toBeInTheDocument();
});
