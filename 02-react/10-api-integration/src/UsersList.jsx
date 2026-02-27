import { useFetchUsers } from './useFetchUsers'

function UsersList() {
  const { users, loading, error } = useFetchUsers()

  // Render UI states progressively.
  if (loading) return <p>Loading users...</p>
  if (error) return <p>{error}</p>

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

export default UsersList
