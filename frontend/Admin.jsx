import React, { useEffect, useState } from 'react'

export default function Admin() {
  const [reports, setReports] = useState([])
  const [selected, setSelected] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    refresh()
  }, [])

  const refresh = async () => {
    const res = await fetch('http://localhost:4000/api/reports')
    setReports(await res.json())
  }

  const open = async (id) => {
    const res = await fetch(`http://localhost:4000/api/reports/${id}`)
    setSelected(await res.json())
  }

  const updateStatus = async (status) => {
    if (!selected) return
    const res = await fetch(`http://localhost:4000/api/reports/${selected.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    setSelected(await res.json())
    refresh()
  }

  const postMessage = async () => {
    if (!selected || !message) return
    const res = await fetch(`http://localhost:4000/api/reports/${selected.id}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender_role: 'counselor', message })
    })
    setMessage('')
    const msgs = await fetch(`http://localhost:4000/api/reports/${selected.id}/messages`).then(r => r.json())
    setSelected({ ...selected, _messages: msgs })
  }

  useEffect(() => {
    if (selected) {
      fetch(`http://localhost:4000/api/reports/${selected.id}/messages`).then(r => r.json()).then(msgs => {
        setSelected(prev => ({ ...prev, _messages: msgs }))
      })
    }
  }, [selected?.id])

  return (
    <main>
      <h2>Admin Dashboard</h2>
      <div style={{ display: 'flex', gap: 24 }}>
        <section style={{ flex: 1 }}>
          <h3>Reports</h3>
          <ul>
            {reports.map(r => (
              <li key={r.id}>
                <button onClick={() => open(r.id)}>Open</button>
                &nbsp;#{r.id} [{r.status}] — {r.category}
              </li>
            ))}
          </ul>
        </section>
        <section style={{ flex: 2 }}>
          {selected ? (
            <div>
              <h3>Report #{selected.id} — {selected.category}</h3>
              <p>{selected.description}</p>
              <p>Status: {selected.status}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => updateStatus('in_review')}>Mark In Review</button>
                <button onClick={() => updateStatus('resolved')}>Resolve</button>
                <button onClick={() => updateStatus('archived')}>Archive</button>
              </div>
              <h4>Messages</h4>
              <ul>
                {(selected._messages || []).map(m => (
                  <li key={m.id}>[{m.sender_role}] {m.message}</li>
                ))}
              </ul>
              <textarea rows="3" cols="60" value={message} onChange={e => setMessage(e.target.value)} />
              <br />
              <button onClick={postMessage}>Send Message</button>
            </div>
          ) : <p>Select a report to view details</p>}
        </section>
      </div>
    </main>
  )
}
