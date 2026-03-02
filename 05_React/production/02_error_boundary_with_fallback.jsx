import { Component } from 'react';

// Beginner: error boundary catches render errors in child tree.
// Advanced: include reset callback for recoverable crashes.
export default class ErrorBoundaryWithFallback extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (this.props.onError) this.props.onError({ error, errorInfo });
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section role="alert">
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={this.reset}>Try again</button>
        </section>
      );
    }

    return this.props.children;
  }
}
