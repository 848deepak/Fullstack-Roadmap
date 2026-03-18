function MessageInput({ value, onChange }) {
  return (
    <div>
      <label htmlFor="contact-message">Message</label>
      <textarea
        id="contact-message"
        name="message"
        placeholder="Enter your message"
        rows="5"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default MessageInput;
