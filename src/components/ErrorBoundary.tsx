// components/ErrorBoundary.tsx
import React, { Component } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  errorInfo?: string;
}

class ErrorBoundary extends Component<any, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: "",
    };
  }

  static getDerivedStateFromError(error: any) {
    // Update state to display fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Log the error to an external service
    console.error("Error Boundary caught an error", error, errorInfo);
    this.setState({
      errorInfo: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI if there's an error
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{this.state.errorInfo}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
