import React from 'react';
import { FaHistory, FaStar, FaUtensils } from 'react-icons/fa';

const ProviderHistory = () => {
    // Dummy data for donation history
    const donationHistory = [
        {
            id: 1,
            foodName: "Vegetable Biryani",
            foodType: "vegetarian",
            numberOfPeople: 25,
            rating: 4.8,
            date: "2024-03-15"
        },
        {
            id: 2,
            foodName: "Chicken Curry",
            foodType: "non-vegetarian",
            numberOfPeople: 30,
            rating: 4.5,
            date: "2024-03-14"
        },
        {
            id: 3,
            foodName: "Paneer Tikka",
            foodType: "vegetarian",
            numberOfPeople: 20,
            rating: 4.9,
            date: "2024-03-13"
        },
        {
            id: 4,
            foodName: "Fish Fry",
            foodType: "non-vegetarian",
            numberOfPeople: 15,
            rating: 4.7,
            date: "2024-03-12"
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
                        <div className="divide-y divide-indigo-900">
                            {donationHistory.map((donation) => (
                                <div key={donation.id} className="p-8 hover:bg-indigo-900/50 transition-colors duration-200">
                                    <div className="flex items-start space-x-6">
                                        <div className="bg-indigo-900 p-4 rounded-lg">
                                            <FaUtensils className="text-emerald-500 text-2xl" />
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-xl font-semibold text-emerald-500">{donation.foodName}</h3>
                                            <div className="flex items-center space-x-6">
                                                <span className="text-base text-indigo-200">
                                                    {donation.foodType === 'vegetarian' ? 'Vegetarian' : 'Non-Vegetarian'}
                                                </span>
                                                <span className="text-base text-indigo-200">
                                                    Sufficient for {donation.numberOfPeople} persons
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <FaStar className="text-yellow-400 text-lg mr-2" />
                                                <span className="text-base font-medium text-white">{donation.rating}/5.0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-base text-indigo-300">
                                        {new Date(donation.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
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