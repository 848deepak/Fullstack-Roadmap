function EmailInput({ value, onChange }) {
  return (
    <div>
      <label htmlFor="contact-email">Email</label>
      <input
        id="contact-email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default EmailInput;
