/* eslint-disable prettier/prettier */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from "./context/AuthProvider.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { GameSessionProvider } from './context/GameSessionProvider.tsx';
import TranslationProvider from './context/TranslationProvider.tsx';
import App from './App.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  //TODO: Remove React.StrictMode when the app is stable
  <React.StrictMode>
    <AuthProvider>
      <TranslationProvider>
        <GameSessionProvider>
          <CartProvider>
            <BrowserRouter
              future={{
                v7_relativeSplatPath: true,
                v7_startTransition: true
              }}>
              <App/>
              <ToastContainer
                className={"toast-container"}
                draggable={"mouse"}
                limit={1}
                newestOnTop={true}
                stacked={true}
                style={{marginTop: 'var(--header-height)', marginRight: '1rem'}}
                theme={"dark"}
              />
            </BrowserRouter>
          </CartProvider>
        </GameSessionProvider>
      </TranslationProvider>
    </AuthProvider>
  </React.StrictMode>
);
