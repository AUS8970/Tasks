import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './router/router.jsx';
import ThemeProvider from './theme/ThemeProvider.jsx';
import AuthProvider from './auth/provider/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position='top-right' reverseOrder={false} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)