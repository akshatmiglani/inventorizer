import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/UserProvider'
import { Outlet, useLocation, useNavigate } from 'react-router';
import { History, Menu, Newspaper, ShoppingBag } from 'lucide-react'
import Sidebar from '../components/Sidebar';

const Dashboard = () => {

  const {user,loading} = useUserContext();
  const navigate= useNavigate();
  const [isSidebarOpen,setIsSidebarOpen]=useState(false);

  useEffect(()=>{
    if(!loading && !user){
      navigate('/login');
    }
  },[loading,user])
  
  if(loading) return <div>"Loading..."</div>;

  const sidebarLinks=[
    {
      key:"History",
      label:"Invoice History",
      path:"/dashboard/view-invoice",
      icon:<History />
    },
    {
      key:"New Invoice",
      label:"New Invoice",
      path:"/dashboard/create-invoice",
      icon:<Newspaper />
    },
    {
      key:"Manage Stock",
      label:"Manage Stock",
      path:"/dashboard/manage-inventory",
      icon:<ShoppingBag />
    }
  ]

  return(
    <>
      <div className='flex min-h-screen bg-white-100 w-full'>
        <Sidebar links={sidebarLinks} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <div className='flex-1 flex flex-col p-4 h-screen overflow-y-auto'>
          <button className='lg:hidden text-2xl mb-4' onClick={()=>setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu />
          </button>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Dashboard