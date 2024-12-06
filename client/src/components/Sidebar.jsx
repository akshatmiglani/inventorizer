import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const Sidebar = ({ links, isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();

  return (
    <div
      className={clsx(
        'fixed inset-y-0 left-0 z-50 flex flex-col justify-between border-e bg-white shadow-lg transition-transform duration-300',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0 lg:static lg:shadow-none lg:w-64'
      )}
    >
      <div className="flex flex-col items-center justify-center py-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg text-gray-600 text-xl font-bold">
          L
        </div>

      </div>

      <nav className="flex-1 px-2 space-y-4">
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.key}>
              <Link
                to={link.path}
                className={clsx(
                  'group flex items-center rounded-lg px-4 py-2 text-sm font-medium transition',
                  location.pathname === link.path
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                )}
              >
                <div className="mr-3">{link.icon}</div>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-gray-100 p-4">
        <button
          type="button"
          className="group flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
