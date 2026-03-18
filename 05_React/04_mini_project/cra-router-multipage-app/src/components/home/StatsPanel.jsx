function StatsPanel({ totalUsers, totalProjects, testCoverage }) {
  return (
    <section className="panel" aria-label="Stats Panel">
      <h3>Quick Stats</h3>
      <ul>
        <li>Total Users: {totalUsers}</li>
        <li>Projects Built: {totalProjects}</li>
        <li>Test Coverage Target: {testCoverage}%</li>
      </ul>
    </section>
  );
}

export default StatsPanel;
