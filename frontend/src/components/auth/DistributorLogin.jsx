import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { distributor } from '../../api/axios';

const DistributorLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await distributor.login(formData);
            if (response.data.token) {
                navigate('/distributor/home');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-200 flex items-center justify-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-20 left-20 w-32 h-32 bg-indigo-300 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 right-20 w-32 h-32 bg-indigo-400 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500 rounded-full blur-2xl"></div>
            </div>

            <div className="max-w-md w-full p-10 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-indigo-100 relative z-10 transform transition-all duration-300 hover:shadow-3xl">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-3">
                        Distributor Login
                    </h2>
                    <p className="text-gray-600">
                        Welcome back! Please login to your account
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

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
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DistributorLogin;
