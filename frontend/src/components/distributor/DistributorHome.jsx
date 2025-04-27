import React, { useState, useEffect } from 'react';
import { FaHome, FaSearch, FaTruck, FaHistory, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { distributor } from '../../api/axios';

const DistributorHome = () => {
    const navigate = useNavigate();
    const [distributorData, setDistributorData] = useState({
        name: '',
        rating: { average: 0, count: 0 },
        totalDeliveries: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await distributor.getProfile();
                if (response.data && response.data.distributor) {
                    const { name, rating, totalDeliveries } = response.data.distributor;
                    setDistributorData({
                        name,
                        rating,
                        totalDeliveries
                    });
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const quickActions = [
        {
            title: "Find Food",
            description: "Browse available food donations near you",
            icon: <FaSearch className="text-emerald-500 text-3xl" />,
            onClick: () => navigate('/distributor/food-near-me')
        },
        {
            title: "Track Deliveries",
            description: "Monitor your current and past deliveries",
            icon: <FaTruck className="text-emerald-500 text-3xl" />,
            onClick: () => navigate('/distributor/tracking')
        },
        {
            title: "Delivery History",
            description: "View your past delivery records",
            icon: <FaHistory className="text-emerald-500 text-3xl" />,
            onClick: () => navigate('/distributor/history')
        }
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-lg">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 text-emerald-500 hover:text-emerald-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto">
                {/* Welcome Section */}
                <div className="mb-8 bg-indigo-950 rounded-lg shadow-lg p-6">
                    <div className="flex items-center mb-4">
                        <FaHome className="text-emerald-500 text-3xl mr-4" />
                        <h1 className="text-3xl font-bold text-emerald-500">Welcome to FoodShare</h1>
                    </div>
                    <p className="text-indigo-200 text-lg">
                        Connect with food providers and help distribute surplus food to those in need.
                    </p>
                </div>

                {/* Organization Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-indigo-900 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">About Your Organization</h2>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <span className="text-indigo-200 w-32">Name:</span>
                                <span className="font-medium text-white">{distributorData.name}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-indigo-200 w-32">Rating:</span>
                                <div className="flex items-center">
                                    <FaStar className="text-yellow-400 mr-1" />
                                    <span className="font-medium text-white">
                                        {distributorData.rating.average.toFixed(1)}/5.0 ({distributorData.rating.count} reviews)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-indigo-900 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Your Impact</h2>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <span className="text-indigo-200 w-32">Total Deliveries:</span>
                                <span className="font-medium text-white">{distributorData.totalDeliveries} deliveries</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                        <div
                            key={index}
                            onClick={action.onClick}
                            className="bg-indigo-950 rounded-lg shadow-lg p-4 text-left hover:shadow-xl transition-shadow duration-300 border border-indigo-900 cursor-pointer"
                        >
                            <div className="mb-3">{action.icon}</div>
                            <h3 className="text-lg font-semibold text-white mb-1">{action.title}</h3>
                            <p className="text-sm text-indigo-200">{action.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DistributorHome; 