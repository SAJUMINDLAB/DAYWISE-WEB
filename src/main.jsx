import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './index-B_kRO0WN.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
