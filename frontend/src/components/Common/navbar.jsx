import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white shadow-lg fixed top-0 left-0 right-0 z-50 h-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                                FoodShare
                            </span>
                        </Link>
                    </div>

                    {/* Right side buttons */}
                    <div className="flex items-center space-x-6">
                        {/* Notifications */}
                        <button className="relative p-2 rounded-full hover:bg-gray-700/50 transition-all duration-300 group">
                            <FaBell className="h-6 w-6 text-emerald-100 group-hover:text-emerald-400 transition-colors duration-300" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full"></span>
                        </button>

                        {/* User Profile */}
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <FaUserCircle className="h-8 w-8 text-emerald-300" />
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-medium text-emerald-100">John Doe</p>
                                <p className="text-xs text-emerald-200">Restaurant Owner</p>
                            </div>
                        </div>

                        {/* Logout */}
                        <button className="p-2 rounded-full hover:bg-gray-700/50 transition-all duration-300 group">
                            <FaSignOutAlt className="h-6 w-6 text-emerald-100 group-hover:text-emerald-400 transition-colors duration-300" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;