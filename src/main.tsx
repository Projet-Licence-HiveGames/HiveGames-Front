import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { translate } from './utils/translations';

import App from './App.tsx';
import './index.css';

(window as any).translate = translate;

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
