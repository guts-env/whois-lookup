'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, Button, Container, Text, Stack } from '@mantine/core';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }

      return (
        <Container size="sm" py="xl">
          <Alert
            title="Something went wrong"
            color="red"
            variant="light"
          >
            <Stack gap="md">
              <Text size="sm">
                {this.state.error?.message || 'An unexpected error occurred'}
              </Text>
              {process.env.NODE_ENV === 'development' && this.state.error?.stack && (
                <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace', fontSize: '11px' }}>
                  {this.state.error.stack}
                </Text>
              )}
              <Button
                onClick={this.handleReset}
                variant="light"
                size="sm"
              >
                Try again
              </Button>
            </Stack>
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}