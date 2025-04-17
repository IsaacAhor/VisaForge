import React from 'react'; // Import React
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider

createRoot(document.getElementById('root')!).render(
  <React.StrictMode> {/* Add StrictMode */}
    <AuthProvider> {/* Wrap App with AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
