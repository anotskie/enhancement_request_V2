// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Root from './routes/Root.jsx';
import Login from './page/Login.jsx';
import Register from './page/Register';
import Home from './page/Home';
import Request from './test/request';

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

  },
  {
    path:'/test',
    element:<Request/>

  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
        <Route />
      </RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);

