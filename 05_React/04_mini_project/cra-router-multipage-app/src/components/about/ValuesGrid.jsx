function ValuesGrid() {
  const values = ['Clarity', 'Reusability', 'Testing', 'Learning'];

  return (
    <section className="panel" aria-label="Values Grid">
      <h3>Core Values</h3>
      <div className="card-list">
        {values.map((value) => (
          <article key={value} className="card">
            {value}
          </article>
        ))}
      </div>
    </section>
  );
}

export default ValuesGrid;
