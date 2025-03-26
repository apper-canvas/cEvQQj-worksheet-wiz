import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { WorksheetProvider } from './context/WorksheetContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <WorksheetProvider>
        <App />
      </WorksheetProvider>
    </BrowserRouter>
  </React.StrictMode>,
)