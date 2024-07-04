//import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from './routes/routes.jsx';
import { UserProvider } from './services/UserContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <UserProvider>
    <App />
    <RouterProvider router={router} />
    </UserProvider>
  // </React.StrictMode>,
)
