import { useState } from 'react'

function RegistrationForm() {
  // Controlled inputs: React state is the single source of truth.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    // Basic front-end validation checks.
    if (!email.includes('@')) {
      setError('Enter a valid email')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setError('')
    alert('Form submitted')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
      <input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" type="password" />
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  )
}

export default RegistrationForm
