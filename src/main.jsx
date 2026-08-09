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

// React가 성공적으로 마운트되었음을 알림 (fallback loader가 이 플래그를 확인)
window.__REACT_MOUNTED__ = true;
