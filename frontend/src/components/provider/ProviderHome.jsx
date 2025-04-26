import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUtensils, FaList, FaHistory, FaStar } from 'react-icons/fa';

const ProviderHome = () => {
    const navigate = useNavigate();

    // Dummy data
    const providerData = {
        name: "Taj Hotel",
        rating: 4.8,
        totalDonations: 156
    };

    const quickActions = [
        {
            icon: <FaUtensils className="text-4xl text-emerald-500" />,
            title: 'Post Food',
            description: 'Share your surplus food with those in need',
            action: () => navigate('/provider/add-food')
        },
        {
            icon: <FaList className="text-4xl text-emerald-500" />,
            title: 'Active Listings',
            description: 'View and manage your current food listings',
            action: () => navigate('/provider/tracking')
        },
        {
            icon: <FaHistory className="text-4xl text-emerald-500" />,
            title: 'History',
            description: 'Check your past donations and activities',
            action: () => navigate('/provider/history')
        }
    ];

    return (
        <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Welcome Section */}
                <div className="bg-indigo-950 rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold text-white mb-4">Welcome to FoodShare</h1>
                    <p className="text-lg text-indigo-200 mb-6">
                        FoodShare is a platform dedicated to reducing food waste and helping those in need by connecting food providers with organizations that can distribute surplus food to communities.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-indigo-900 rounded-lg p-4">
                            <h2 className="text-xl font-semibold text-white mb-2">About Your Restaurant</h2>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <span className="text-indigo-200 w-32">Name:</span>
                                    <span className="font-medium text-white">{providerData.name}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-indigo-200 w-32">Rating:</span>
                                    <div className="flex items-center">
                                        <FaStar className="text-yellow-400 mr-1" />
                                        <span className="font-medium text-white">{providerData.rating}/5.0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-indigo-900 rounded-lg p-4">
                            <h2 className="text-xl font-semibold text-white mb-2">Your Impact</h2>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <span className="text-indigo-200 w-32">Total Donations:</span>
                                    <span className="font-medium text-white">{providerData.totalDonations} items</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                        <button
                            key={index}
                            onClick={action.action}
                            className="bg-indigo-950 rounded-lg shadow-lg p-4 text-left hover:shadow-xl transition-shadow duration-300 border border-indigo-900"
                        >
                            <div className="mb-3">{action.icon}</div>
                            <h3 className="text-lg font-semibold text-white mb-1">{action.title}</h3>
                            <p className="text-sm text-indigo-200">{action.description}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProviderHome; 