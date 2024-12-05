import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const RootLayout = () => {

    return <>
        <h1 className="text-4xl font-bold underline">
            Hello world!
        </h1>
        <main>
            <Outlet />
        </main>
    </>
}

export default RootLayout