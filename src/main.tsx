import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-react-diagrams/styles/material.css';
import App from './App.tsx'
import { registerLicense } from '@syncfusion/ej2-base';

const SYNCFUSION_KEY = import.meta.env.VITE_SYNCFUSION_API_KEY;
registerLicense(SYNCFUSION_KEY); // reemplaza con la key que recibiste por correo


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);