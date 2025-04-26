import React from 'react';
import { FaHistory, FaUtensils, FaLeaf, FaDrumstickBite, FaUsers, FaCalendarAlt, FaUser } from 'react-icons/fa';

const ProviderHistory = () => {
    // Dummy data for donation history (will be replaced with backend data)
    const donationHistory = [
        {
            id: 1,
            pickupDate: "2024-03-15",
            pickupBy: "Mumbai Homeless Shelter",
            foodItems: [
                {
                    id: 1,
                    foodName: "Vegetable Biryani",
                    foodType: "vegetarian",
                    sufficientFor: 25
                },
                {
                    id: 2,
                    foodName: "Chicken Curry",
                    foodType: "non-vegetarian",
                    sufficientFor: 30
                }
            ]
        },
        {
            id: 2,
            pickupDate: "2024-03-14",
            pickupBy: "Children's Orphanage",
            foodItems: [
                {
                    id: 3,
                    foodName: "Paneer Tikka",
                    foodType: "vegetarian",
                    sufficientFor: 20
                },
                {
                    id: 4,
                    foodName: "Fish Fry",
                    foodType: "non-vegetarian",
                    sufficientFor: 15
                }
            ]
        }
    ];

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <FaHistory className="text-emerald-500 text-3xl mr-4" />
                    <h1 className="text-3xl font-bold text-emerald-500">Donation History</h1>
                </div>

                <div className="bg-indigo-950 rounded-xl shadow-lg overflow-hidden">
                    {donationHistory.length === 0 ? (
                        <div className="p-8 text-center">
                            <FaHistory className="text-indigo-400 text-5xl mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-emerald-500 mb-2">No Donation History</h2>
                            <p className="text-indigo-200">Your donation history will appear here.</p>
                        </div>
                    ) : (
                        <div className="space-y-8 p-8">
                            {donationHistory.map((donation) => (
                                <div key={donation.id} className="bg-indigo-900 rounded-xl p-6 hover:bg-indigo-900/80 transition-colors duration-200">
                                    {/* Pickup Details */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center text-indigo-200">
                                                <FaCalendarAlt className="text-emerald-500 mr-2" />
                                                <span>{new Date(donation.pickupDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}</span>
                                            </div>
                                            <div className="flex items-center text-indigo-200">
                                                <FaUser className="text-emerald-500 mr-2" />
                                                <span>Picked up by: {donation.pickupBy}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Food Items */}
                                    <div className="space-y-4">
                                        {donation.foodItems.map((food) => (
                                            <div key={food.id} className="bg-indigo-950 rounded-lg p-4">
                                                <div className="flex items-start space-x-4">
                                                    <div className="bg-indigo-900 p-3 rounded-lg">
                                                        <FaUtensils className="text-emerald-500 text-xl" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-emerald-500 mb-2">{food.foodName}</h3>
                                                        <div className="flex items-center space-x-6">
                                                            <div className="flex items-center text-indigo-200">
                                                                {food.foodType === 'vegetarian' ? (
                                                                    <FaLeaf className="text-emerald-500 mr-2" />
                                                                ) : (
                                                                    <FaDrumstickBite className="text-emerald-500 mr-2" />
                                                                )}
                                                                <span>{food.foodType === 'vegetarian' ? 'Vegetarian' : 'Non-Vegetarian'}</span>
                                                            </div>
                                                            <div className="flex items-center text-indigo-200">
                                                                <FaUsers className="text-emerald-500 mr-2" />
                                                                <span>Sufficient for {food.sufficientFor} persons</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProviderHistory; 