import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "@contexts/AuthProvider.tsx";
import { CartProvider } from "@contexts/CartContext.tsx";
import { GameSessionProvider } from "@contexts/GameSessionProvider.tsx";
import TranslationProvider from "@contexts/TranslationProvider.tsx";

import App from "./App.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //TODO: Remove React.StrictMode when the app is stable
  <React.StrictMode>
    <AuthProvider>
      <TranslationProvider>
        <GameSessionProvider>
          <CartProvider>
            <BrowserRouter
              future={{
                v7_relativeSplatPath: true,
                v7_startTransition: true,
              }}
            >
              <App />
              <ToastContainer
                closeOnClick
                limit={1}
                newestOnTop
                position="top-center"
                theme={"dark"}
              />
            </BrowserRouter>
          </CartProvider>
        </GameSessionProvider>
      </TranslationProvider>
    </AuthProvider>
  </React.StrictMode>,
);
