import { Component } from "react";
import type { ReactNode } from "react";

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Erro capturado no ErrorBoundary:", error);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-red-600">Erro ao carregar o carrinho.</div>;
    }

    return this.props.children;
  }
}
