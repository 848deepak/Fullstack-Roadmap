import { useRef } from 'react'

function UseRefExample() {
  const inputRef = useRef(null)

  const focusInput = () => {
    // useRef stores mutable value without triggering re-render.
    inputRef.current?.focus()
  }

  return (
    <section>
      <input ref={inputRef} placeholder="Focus me using ref" />
      <button onClick={focusInput}>Focus Input</button>
    </section>
  )
}

export default UseRefExample
