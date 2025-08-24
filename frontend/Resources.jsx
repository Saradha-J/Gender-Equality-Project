import React, { useEffect, useState } from 'react'

export default function Resources() {
  const [items, setItems] = useState([])
  const [kind, setKind] = useState('')

  useEffect(() => {
    const url = new URL('http://localhost:4000/api/resources')
    if (kind) url.searchParams.set('kind', kind)
    fetch(url).then(r => r.json()).then(setItems)
  }, [kind])

  return (
    <main>
      <h2>Educational Resources</h2>
      <label>Filter: </label>
      <select value={kind} onChange={e => setKind(e.target.value)}>
        <option value="">All</option>
        <option value="article">Articles</option>
        <option value="video">Videos</option>
        <option value="policy">Policies</option>
        <option value="helpline">Helplines</option>
      </select>
      <ul>
        {items.map(x => (
          <li key={x.id}>
            <strong>{x.title}</strong> ({x.kind}) {x.url ? <a href={x.url} target="_blank">Open</a> : null}
          </li>
        ))}
      </ul>
    </main>
  )
}
