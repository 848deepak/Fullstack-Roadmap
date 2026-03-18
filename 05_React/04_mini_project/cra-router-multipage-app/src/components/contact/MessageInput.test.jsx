import { fireEvent, render, screen } from '@testing-library/react';
import MessageInput from './MessageInput';

test('renders and updates message input', () => {
  const handleChange = jest.fn();
  render(<MessageInput value="" onChange={handleChange} />);
  fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello world' } });
  expect(handleChange).toHaveBeenCalled();
});
