import { useEffect, useState } from 'react'

function UseEffectExample() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    // Side effect: start timer after first render.
    const timer = setInterval(() => {
      setSeconds((value) => value + 1)
    }, 1000)

    // Cleanup: clear timer on unmount.
    return () => clearInterval(timer)
  }, [])

  return <p>Timer: {seconds}s</p>
}

export default UseEffectExample
