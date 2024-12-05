import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout.jsx'
import Landing from './pages/Landing.jsx'
import './index.css';

const router= createBrowserRouter([
  {element : <RootLayout />,
    children:[
      {path:'/',element: <Landing />}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
