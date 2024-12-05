import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const RootLayout = () => {

    return <>
    <div className='m-4'>
        <span className="flex items-center">
            <span className="h-px flex-1 bg-black"></span>
            <span className="shrink-0 px-10 font-bold font-sans text-xl ">Inventorizer</span>
            <span className="h-px flex-1 bg-black"></span>
        </span>
    </div>
        <main className='m-4'>
            <Outlet />
        </main>
    </>
}

export default RootLayout