import { useEffect, useState } from 'react'

export function useFetchUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadUsers() {
      try {
        // Request remote data.
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        // Store user-friendly error message.
        setError('Could not fetch users')
      } finally {
        // Always stop loading, success or failure.
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return { users, loading, error }
}
