import { useState } from 'react';

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setStatus('Please enter an email.');
      return;
    }
    setStatus(`Subscribed: ${email}`);
    setEmail('');
  };

  return (
    <section className="panel" aria-label="Newsletter Signup">
      <h3>Newsletter</h3>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="newsletter-email">Email</label>
        <input
          id="newsletter-email"
          name="newsletterEmail"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit">Subscribe</button>
      </form>
      {status && <p className="small">{status}</p>}
    </section>
  );
}

export default NewsletterSignup;
