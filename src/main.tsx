import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {BrowserRouter} from 'react-router-dom';
import {translate} from './utils/translations';
import {AuthProvider} from "./context/AuthProvider.tsx";
import { GameSessionProvider } from './context/GameSessionProvider.tsx';
import { Toaster } from 'react-hot-toast';
import './index.css';

(window as any).translate = translate;

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <GameSessionProvider>
                <BrowserRouter
                    future={{
                        v7_relativeSplatPath: true,
                        v7_startTransition: true
                    }}>
                    <App/>
                    <Toaster/>
                </BrowserRouter>
            </GameSessionProvider>
        </AuthProvider>
    </React.StrictMode>
);
