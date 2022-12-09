import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AppRoutes } from './routes/AppRoutes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <div style={{ width: '100%' }}>
        <AppRoutes />
      </div>
    </BrowserRouter>
  </React.StrictMode>
)
