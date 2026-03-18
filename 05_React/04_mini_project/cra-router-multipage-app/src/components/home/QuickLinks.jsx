function QuickLinks({ links }) {
  return (
    <section className="panel" aria-label="Quick Links">
      <h3>Quick Links</h3>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuickLinks;
