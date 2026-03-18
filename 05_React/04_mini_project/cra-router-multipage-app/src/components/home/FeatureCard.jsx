function FeatureCard({ heading, description }) {
  return (
    <article className="card" aria-label="Feature Card">
      <h3>{heading}</h3>
      <p className="small">{description}</p>
    </article>
  );
}

export default FeatureCard;
