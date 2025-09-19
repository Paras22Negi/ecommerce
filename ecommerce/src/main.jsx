import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Redux/store.js'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import Header from './Components/Header.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
