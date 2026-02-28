import { useState } from 'react'

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  const toggle = () => setValue((current) => !current)
  return { value, toggle }
}
