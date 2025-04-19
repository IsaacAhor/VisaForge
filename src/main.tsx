import React from 'react'; // Import React
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext'; // Restore AuthProvider

createRoot(document.getElementById('root')!).render(
  <React.StrictMode> {/* Add StrictMode */}
    <AuthProvider> {/* Restore AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
