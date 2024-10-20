// frontend/src/index.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Optionnel : si tu veux importer des styles globaux

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);