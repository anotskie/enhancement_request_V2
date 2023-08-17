import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import Root from './routes/Root.jsx';

import Login from './page/Login.jsx'
import Register from './page/Register';
import Home from './page/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    
  },
  
  {
    path: '/root', 
    element: <Root/>,
  },

  {
    path:'/register',
    element: <Register/>
  },

  {
    path:'/home',
    element:<Home/>

  }



]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Route />
    </RouterProvider>
  </React.StrictMode>
);
