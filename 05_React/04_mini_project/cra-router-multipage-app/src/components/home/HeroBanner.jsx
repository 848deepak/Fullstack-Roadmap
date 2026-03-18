function HeroBanner({ title, subtitle }) {
  return (
    <section className="panel" aria-label="Hero Banner">
      <h2>{title}</h2>
      <p className="small">{subtitle}</p>
    </section>
  );
}

export default HeroBanner;
