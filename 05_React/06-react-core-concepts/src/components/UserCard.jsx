function UserCard({ name, role }) {
  // Props are read-only inputs from parent component.
  return (
    <article>
      <h3>{name}</h3>
      <p>{role}</p>
    </article>
  )
}

export default UserCard
