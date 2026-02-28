import { useRef, useState } from 'react'

function UncontrolledForm() {
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const [output, setOutput] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setOutput(`${nameRef.current?.value} | ${emailRef.current?.value}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} placeholder="Name" />
      <input ref={emailRef} placeholder="Email" />
      <button type="submit">Submit</button>
      {output && <p>{output}</p>}
    </form>
  )
}

export default UncontrolledForm
