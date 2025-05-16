/* eslint-disable prettier/prettier */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from "./context/AuthProvider.tsx";
import { GameSessionProvider } from './context/GameSessionProvider.tsx';
import TranslationProvider from './context/TranslationProvider.tsx';
import App from './App.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <TranslationProvider>
        <GameSessionProvider>
          <BrowserRouter
            future={{
              v7_relativeSplatPath: true,
              v7_startTransition: true
            }}>
            <App/>
            <ToastContainer />
          </BrowserRouter>
        </GameSessionProvider>
      </TranslationProvider>
    </AuthProvider>
  </React.StrictMode>
);
