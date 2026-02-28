import React from 'react'

function withLoader(Component) {
  return function WithLoader({ loading, ...props }) {
    if (loading) return <p>Loading...</p>
    return <Component {...props} />
  }
}

function Profile({ name }) {
  return <p>Profile: {name}</p>
}

export default withLoader(Profile)
