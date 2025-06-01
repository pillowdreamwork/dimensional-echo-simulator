import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card } from './ui/card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Quantum Reality Error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  private handleReset = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg p-6 space-y-4 bg-background/95 backdrop-blur">
            <h2 className="text-2xl font-bold text-red-500">
              Reality Destabilization Detected
            </h2>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {this.state.error?.message || 'A quantum anomaly has occurred'}
              </p>
              {this.state.errorInfo && (
                <pre className="p-4 bg-muted rounded-lg text-xs overflow-auto max-h-[200px]">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={this.handleReset}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                Recalibrate Reality
              </button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
