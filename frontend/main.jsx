import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import App from './App.jsx'
import ReportForm from './pages/ReportForm.jsx'
import Resources from './pages/Resources.jsx'
import Admin from './pages/Admin.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<ReportForm />} />
        <Route path="resources" element={<Resources />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
