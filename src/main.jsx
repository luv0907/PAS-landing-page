import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// headings start hidden (they fall in once visible); only when JS runs
document.documentElement.classList.add('js-drop');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
