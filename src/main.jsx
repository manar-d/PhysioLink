import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import { initDB } from './db/database.js'

initDB(); 

createRoot(document.getElementById('root')).render(
 <StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </StrictMode>
  ,
)
