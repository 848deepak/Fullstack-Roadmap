import { useEffect, useState } from 'react'

function LifecycleDemo() {
  const [value, setValue] = useState(0)

  useEffect(() => {
    console.log('Mounting phase')

    return () => {
      console.log('Unmounting cleanup')
    }
  }, [])

  useEffect(() => {
    console.log('Updating phase: value changed to', value)
  }, [value])

  return (
    <section>
      <p>Lifecycle value: {value}</p>
      <button onClick={() => setValue((current) => current + 1)}>Update</button>
    </section>
  )
}

export default LifecycleDemo
