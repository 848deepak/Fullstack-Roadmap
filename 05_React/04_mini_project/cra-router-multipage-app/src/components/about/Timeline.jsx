function Timeline() {
  const milestones = ['Project kickoff', 'Component design', 'Testing completion'];

  return (
    <section className="panel" aria-label="Timeline">
      <h3>Timeline</h3>
      <ol>
        {milestones.map((milestone) => (
          <li key={milestone}>{milestone}</li>
        ))}
      </ol>
    </section>
  );
}

export default Timeline;
