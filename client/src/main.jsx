import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout.jsx'
import Landing from './pages/Landing.jsx'
import './index.css';
import Onboarding from './pages/Onboarding.jsx'
import Login from './pages/Login.jsx'
import UserProvider from './context/UserProvider.jsx'
import ProtectedRoute from './context/ProtectedRoute.jsx'
import Dashboard from './pages/Dashboard.jsx'
import DashboardInventory from './pages/DashboardInventory.jsx'
import DashboardInvoice from './pages/DashboardInvoice.jsx'
import DashboardHistory from './pages/DashboardHistory.jsx'


const router= createBrowserRouter([
  {element : <RootLayout />,
    children:[
      {path:'/',element: <Landing />},
      {path:'/register',element:<Onboarding />},
      {path:'/login',element:<Login />},
      {
        path:'/dashboard',
        element:(
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children:[
          {path:'manage-inventory',element:<DashboardInventory />},
          {path:'create-invoice',element:<DashboardInvoice />},
          {path:'view-invoice',element:<DashboardHistory />}
        ]
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)
