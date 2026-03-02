import { useState } from 'react';

// Beginner: controlled input means React state is source of truth.
// Advanced: normalization prevents subtle whitespace bugs in persisted data.
export default function BeginnerControlledForm() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase()
    };

    if (!payload.name || !payload.email.includes('@')) return;
    setSubmitted(payload);
  }

  return (
    <section>
      <h2>Controlled Form</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <button type="submit">Submit</button>
      </form>
      {submitted && <p>Saved: {submitted.name} ({submitted.email})</p>}
    </section>
  );
}
