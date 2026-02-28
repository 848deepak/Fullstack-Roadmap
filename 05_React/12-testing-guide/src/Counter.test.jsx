import { fireEvent, render, screen } from '@testing-library/react'
import Counter from './Counter'

test('increments counter', () => {
  // Arrange
  render(<Counter />)
  // Act
  fireEvent.click(screen.getByText('Increase'))
  // Assert
  expect(screen.getByTestId('count-value').textContent).toBe('1')
})
