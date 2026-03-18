function NameInput({ value, onChange }) {
  return (
    <div>
      <label htmlFor="contact-name">Name</label>
      <input
        id="contact-name"
        name="name"
        placeholder="Enter your name"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default NameInput;
