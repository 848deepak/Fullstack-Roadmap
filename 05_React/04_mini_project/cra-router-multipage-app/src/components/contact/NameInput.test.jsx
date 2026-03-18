import { fireEvent, render, screen } from '@testing-library/react';
import NameInput from './NameInput';

test('renders and updates name input', () => {
  const handleChange = jest.fn();
  render(<NameInput value="" onChange={handleChange} />);
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Deepak' } });
  expect(handleChange).toHaveBeenCalled();
});
