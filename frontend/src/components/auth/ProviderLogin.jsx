import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProviderLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Form data:', formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 flex items-center justify-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-400 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-500 rounded-full blur-2xl"></div>
            </div>

            <div className="max-w-md w-full p-10 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-yellow-100 relative z-10 transform transition-all duration-300 hover:shadow-3xl">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-gray-800 mb-3">
                        Provider Login
                    </h2>
                    <p className="text-gray-600">
                        Welcome back! Please sign in to your account
                    </p>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 mx-auto mt-4 rounded-full"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-300"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-300"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-yellow-600 hover:text-yellow-500">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                    >
                        Sign in
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate('/provider/register')}
                            className="font-medium text-yellow-600 hover:text-yellow-500"
                        >
                            Register
                        </button>
                    </p>
                </div>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="text-sm font-medium text-gray-600 hover:text-gray-500"
                    >
                        Back to home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProviderLogin;
