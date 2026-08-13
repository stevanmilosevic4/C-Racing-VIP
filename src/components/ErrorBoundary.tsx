import { Component, type ReactNode } from 'react'

// Last line of defence: if any page throws at render time, show a friendly
// recovery card instead of a blank white screen.
export default class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) { return { error } }

  componentDidCatch(error: Error) { console.error('page crashed:', error) }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="wrap" style={{ paddingTop: 60, textAlign: 'center' }}>
        <div style={{ fontSize: 44 }}>🔧</div>
        <h1 style={{ fontSize: 26, fontWeight: 900, marginTop: 12 }}>This page hit a snag</h1>
        <p className="muted" style={{ fontSize: 14, marginTop: 8, maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}>
          The rest of the app is fine — try reloading, or head back home.
        </p>
        <div className="muted" style={{ fontSize: 11, marginTop: 12, wordBreak: 'break-word' }}>{String(this.state.error)}</div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 }}>
          <button className="btn btn-red" onClick={() => window.location.reload()}>Reload</button>
          <button className="btn btn-dark" onClick={() => { window.location.href = '/' }}>Go home</button>
        </div>
      </div>
    )
  }
}
