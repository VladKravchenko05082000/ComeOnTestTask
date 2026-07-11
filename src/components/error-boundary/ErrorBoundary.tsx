import { Component, type ErrorInfo, type ReactNode } from "react";

import { Button } from "@/components/ui/buttons/Button";
import { ErrorBanner } from "@/components/ui/banners/ErrorBanner";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Uncaught error in ErrorBoundary:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    if (this.props.fallback) return this.props.fallback;

    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-xl font-bold">Something went wrong</h1>

        <ErrorBanner className="text-left">
          An unexpected error occurred while rendering this page.
        </ErrorBanner>

        <Button type="button" onClick={this.handleReset} className="mt-2">
          Try again
        </Button>
      </div>
    );
  }
}
