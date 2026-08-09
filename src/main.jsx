import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './index-B_kRO0WN.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

// JS가 정상 실행되었음을 알리기 위해 디버그 텍스트 숨김
const debugText = document.getElementById('debug-text');
if (debugText) {
  debugText.style.display = 'none';
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
