import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, AlertTitle, Button, Box } from '@mui/material';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box sx={{ p: 3 }}>
          <Alert severity="error">
            <AlertTitle>Something went wrong</AlertTitle>
            {this.state.error?.message || 'An unexpected error occurred'}
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" onClick={this.handleReset}>
                Try again
              </Button>
            </Box>
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}