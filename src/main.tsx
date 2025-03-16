import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {translate} from './utils/translations';

import App from './App.tsx';
import './index.css';
import {AuthProvider} from "./context/AuthProvider.tsx";

(window as any).translate = translate;

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <BrowserRouter
            future={{
                v7_relativeSplatPath: true,
                v7_startTransition: true
            }}>
            <App/>
        </BrowserRouter>
    </AuthProvider>
);
