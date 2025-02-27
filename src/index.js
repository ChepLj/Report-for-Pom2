import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import{ AllDataProvider } from './context/allDataContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
const temp = 'test'
root.render(
   // <React.StrictMode>
   <BrowserRouter>
      <AllDataProvider>
         <App />
      </AllDataProvider>
   </BrowserRouter>,
   // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

