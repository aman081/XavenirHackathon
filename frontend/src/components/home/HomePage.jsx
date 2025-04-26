import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [showUserType, setShowUserType] = useState(false);

    const handleAdminClick = () => {
        navigate('/admin/login');
    };

    const handleUserClick = () => {
        setShowUserType(true);
    };

    const handleProviderClick = () => {
        navigate('/provider/register');
    };

    const handleDistributorClick = () => {
        navigate('/distributor/register');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 flex items-center justify-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-400 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-500 rounded-full blur-2xl"></div>
            </div>

            <div className="max-w-lg w-full p-10 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-yellow-100 relative z-10 transform transition-all duration-300 hover:shadow-3xl">
                {!showUserType ? (
                    <>
                        <div className="text-center">
                            <h2 className="text-5xl font-bold text-gray-800 mb-3">
                                Welcome to FoodShare
                            </h2>
                            <p className="text-gray-600 mb-8 text-lg">
                                Connecting Food, Connecting Hearts
                            </p>
                            <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 mx-auto mb-10 rounded-full"></div>
                        </div>
                        <div className="mt-10 space-y-6">
                            <button
                                onClick={handleAdminClick}
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                            >
                                I am an Admin
                            </button>

                            <button
                                onClick={handleUserClick}
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                            >
                                I am a User
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-center">
                            <h2 className="text-4xl font-bold text-gray-800 mb-3">
                                Select User Type
                            </h2>
                            <p className="text-gray-600 mb-8 text-lg">
                                Are you a food provider or distributor?
                            </p>
                            <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 mx-auto mb-10 rounded-full"></div>
                        </div>
                        <div className="mt-10 space-y-6">
                            <button
                                onClick={handleProviderClick}
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                            >
                                Food Provider (Restaurant/Hotel)
                            </button>

                            <button
                                onClick={handleDistributorClick}
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                            >
                                Food Distributor (NGO)
                            </button>

                            <button
                                onClick={() => setShowUserType(false)}
                                className="w-full flex justify-center py-4 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                            >
                                Go Back
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default HomePage; 