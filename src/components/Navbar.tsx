import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const NavBar = ({ user }) => {
    
    const location = useLocation();
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success("Logout Successfull");
        navigate('/login')
    }

    return (
        <nav className="bg-white border-gray-200 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/logo.png" className="h-8" alt="logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap ">Music Byte</span>
                </Link>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

                    <span>
                        <button className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 " onClick={handleLogout}>Sign out</button>
                    </span>

                    <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow " id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 ">{user.firstName}</span>
                            <span className="block text-sm  text-gray-500 truncate ">{user.email}</span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            
                            <li>
                                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 " onClick={handleLogout}>Sign out</button>
                            </li>
                        </ul>
                    </div>
                    <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-user" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
                        <li>
                            <Link to="/dashboard" className={`block py-2 px-3 bg-blue-700 rounded md:bg-transparent md:p-0 ${location.pathname === '/dashboard' ? 'text-blue-700' : 'text-gray-500'}`} aria-current="page">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/searchsongs" className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  ${location.pathname === '/searchsongs' ? 'text-blue-700' : 'text-gray-500'}`}>Search Songs</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;