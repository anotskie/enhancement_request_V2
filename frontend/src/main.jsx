import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import './index.css';
import Root from './routes/Root.jsx';

import Login from './page/Login.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    
  },
  
  {
    path: '/root',    // Add a route for the Login page
    element: <Root/>,
  },

  


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Route />
    </RouterProvider>
  </React.StrictMode>
);
