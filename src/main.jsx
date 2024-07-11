import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider } from "react-router-dom";
import { router } from './routes/routes.jsx';
import { UserProvider } from './services/UserContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StudentsTable from './pages/StudentsTable.jsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </QueryClientProvider>
);