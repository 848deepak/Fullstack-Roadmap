import { fireEvent, render, screen } from '@testing-library/react';
import ContactPage from './ContactPage';

test('renders contact page and submits form', () => {
  render(<ContactPage />);
  fireEvent.change(screen.getByLabelText(/name/i), { target: { name: 'name', value: 'User' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { name: 'email', value: 'user@example.com' } });
  fireEvent.change(screen.getByLabelText(/message/i), { target: { name: 'message', value: 'Hello' } });
  fireEvent.click(screen.getByRole('button', { name: /send message/i }));
  expect(screen.getByText(/contact form submitted/i)).toBeInTheDocument();
});
