import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('Captured by error boundary:', error)
  }

  render() {
    if (this.state.hasError) return <p>Something went wrong.</p>
    return this.props.children
  }
}

export default ErrorBoundary
