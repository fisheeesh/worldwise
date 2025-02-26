import { createRoot } from 'react-dom/client'
import Router from './router/index.jsx'
import './index.css'
import AppContextProvider from './contexts/AppContextProvider.jsx'
import FakeAuthContextProvider from './contexts/FakeAuthContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <FakeAuthContextProvider>
    <AppContextProvider>
      <Router />
    </AppContextProvider>
  </FakeAuthContextProvider>
)
