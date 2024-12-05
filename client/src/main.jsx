import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout.jsx'
import Landing from './pages/Landing.jsx'
import './index.css';
import Onboarding from './pages/Onboarding.jsx'
import Login from './pages/Login.jsx'


const router= createBrowserRouter([
  {element : <RootLayout />,
    children:[
      {path:'/',element: <Landing />},
      {path:'/register',element:<Onboarding />},
      {path:'/login',element:<Login />},

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
