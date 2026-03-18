import { useState } from 'react';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      setStatus('Please complete all registration fields.');
      return;
    }
    setStatus(`Registered: ${name}`);
  };

  return (
    <section className="panel" aria-label="Register Page">
      <h1>Register</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="register-name">Name</label>
        <input id="register-name" value={name} onChange={(event) => setName(event.target.value)} />

        <label htmlFor="register-email">Email</label>
        <input id="register-email" value={email} onChange={(event) => setEmail(event.target.value)} />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Create Account</button>
      </form>
      {status && <p className="small">{status}</p>}
    </section>
  );
}

export default RegisterPage;
