import React, { useState } from 'react'

export default function ReportForm() {
  const [category, setCategory] = useState('discrimination')
  const [description, setDescription] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [result, setResult] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:4000/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_anonymous: isAnonymous, category, description })
    })
    const data = await res.json()
    setResult(data)
  }

  return (
    <main>
      <h2>Anonymous Reporting</h2>
      <form onSubmit={submit}>
        <label>Category: </label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="discrimination">Discrimination</option>
          <option value="harassment">Harassment</option>
          <option value="other">Other</option>
        </select>
        <br /><br />
        <label>Description:</label><br />
        <textarea rows="6" cols="60" value={description} onChange={e => setDescription(e.target.value)} required />
        <br />
        <label>
          <input type="checkbox" checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} />
          Submit Anonymously
        </label>
        <br /><br />
        <button type="submit">Submit Report</button>
      </form>

      {result && (
        <div>
          <h3>Submitted</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </main>
  )
}
