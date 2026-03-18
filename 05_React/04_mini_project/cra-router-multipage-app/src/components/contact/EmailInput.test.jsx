import { fireEvent, render, screen } from '@testing-library/react';
import EmailInput from './EmailInput';

test('renders and updates email input', () => {
  const handleChange = jest.fn();
  render(<EmailInput value="" onChange={handleChange} />);
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'mail@example.com' } });
  expect(handleChange).toHaveBeenCalled();
});
