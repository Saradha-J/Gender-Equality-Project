import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <header>
        <h1>Gender Equality Platform</h1>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link to="/">Report</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/admin">Admin</Link>
        </nav>
        <hr />
      </header>
      <Outlet />
    </div>
  )
}
