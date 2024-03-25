import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MenuPage from './pages/MenuPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Something Went Wrong!</h1>,
    children: [
      {
        index: true,
        element: <MenuPage />
      }, {
        path: '/checkout',
        element: <CheckoutPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)