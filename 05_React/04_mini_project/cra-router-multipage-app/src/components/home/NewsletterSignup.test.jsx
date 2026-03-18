import { fireEvent, render, screen } from '@testing-library/react';
import NewsletterSignup from './NewsletterSignup';

test('shows validation message when email is empty', () => {
  render(<NewsletterSignup />);
  fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));
  expect(screen.getByText(/please enter an email/i)).toBeInTheDocument();
});

test('submits and shows subscribed message', () => {
  render(<NewsletterSignup />);
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));
  expect(screen.getByText(/subscribed: test@example.com/i)).toBeInTheDocument();
});
