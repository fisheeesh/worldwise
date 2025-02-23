import { createRoot } from 'react-dom/client'
import Router from './router/index.jsx'
import './index.css'
import AppContextProvider from './contexts/AppContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <Router />
  </AppContextProvider>
)
