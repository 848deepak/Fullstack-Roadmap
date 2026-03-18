function TeamList() {
  const members = ['Frontend Engineer', 'QA Engineer', 'Product Designer'];

  return (
    <section className="panel" aria-label="Team List">
      <h3>Team</h3>
      <ul>
        {members.map((member) => (
          <li key={member}>{member}</li>
        ))}
      </ul>
    </section>
  );
}

export default TeamList;
