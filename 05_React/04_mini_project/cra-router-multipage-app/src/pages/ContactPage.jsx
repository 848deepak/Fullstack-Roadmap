import { useState } from 'react';
import NameInput from '../components/contact/NameInput';
import EmailInput from '../components/contact/EmailInput';
import MessageInput from '../components/contact/MessageInput';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill all contact fields.');
      return;
    }
    setStatus('Contact form submitted.');
  };

  return (
    <section className="panel" aria-label="Contact Page">
      <h1>Contact</h1>
      <form className="form" onSubmit={handleSubmit}>
        <NameInput value={formData.name} onChange={handleChange} />
        <EmailInput value={formData.email} onChange={handleChange} />
        <MessageInput value={formData.message} onChange={handleChange} />
        <button type="submit">Send Message</button>
      </form>
      {status && <p className="small">{status}</p>}
    </section>
  );
}

export default ContactPage;
