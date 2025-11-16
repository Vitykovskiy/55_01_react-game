import { Component, ErrorInfo, ReactNode } from 'react'
import { ErrorPage } from '@pages/index'
import { ErrorCode } from '@pages/errorPage'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, info)
  }

  render() {
    const { hasError } = this.state

    if (hasError) {
      return <ErrorPage code={ErrorCode.ServerError} />
    }

    return this.props.children
  }
}
