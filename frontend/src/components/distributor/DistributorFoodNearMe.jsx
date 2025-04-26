import React, { useState } from 'react';
import { FaSearch, FaUtensils, FaMapMarkerAlt, FaUsers, FaLeaf, FaDrumstickBite } from 'react-icons/fa';

const DistributorFoodNearMe = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Dummy data for food items grouped by restaurant
    const restaurants = [
        {
            id: 1,
            name: "Taj Hotel, Mumbai",
            distance: "2.5 km",
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
            name: "Grand Hyatt, Mumbai",
            distance: "3.1 km",
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

    const handleClaim = (restaurantId, foodId) => {
        console.log('Claiming food item:', foodId, 'from restaurant:', restaurantId);
        // Add claim logic here
    };

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <FaSearch className="text-emerald-500 text-3xl mr-4" />
                    <h1 className="text-3xl font-bold text-emerald-500">Food Near Me</h1>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for food items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-indigo-900 text-white placeholder-indigo-300 rounded-lg py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300" />
                    </div>
                </div>

                {/* Restaurants Grid */}
                <div className="space-y-6">
                    {restaurants.map((restaurant) => (
                        <div key={restaurant.id} className="bg-indigo-950 rounded-xl shadow-lg overflow-hidden border border-indigo-900">
                            {/* Restaurant Header */}
                            <div className="bg-indigo-900 p-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="text-emerald-500 mr-3" />
                                    <h2 className="text-xl font-semibold text-white">{restaurant.name}</h2>
                                </div>
                                <span className="text-indigo-200">{restaurant.distance} away</span>
                            </div>

                            {/* Food Items Grid */}
                            <div className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {restaurant.foodItems.map((item) => (
                                        <div key={item.id} className="bg-indigo-900 rounded-lg p-4 hover:bg-indigo-800/50 transition-colors duration-200">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center">
                                                    <div className="bg-indigo-950 p-2 rounded-lg mr-3">
                                                        <FaUtensils className="text-emerald-500" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">{item.foodName}</h3>
                                                        <div className="flex items-center mt-1">
                                                            {item.foodType === 'vegetarian' ? (
                                                                <FaLeaf className="text-emerald-500 mr-1" />
                                                            ) : (
                                                                <FaDrumstickBite className="text-emerald-500 mr-1" />
                                                            )}
                                                            <span className="text-indigo-200 text-sm">
                                                                {item.foodType === 'vegetarian' ? 'Vegetarian' : 'Non-Vegetarian'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center text-indigo-200 mb-4">
                                                <FaUsers className="text-emerald-500 mr-2" />
                                                <span>Sufficient for {item.sufficientFor} persons</span>
                                            </div>

                                            <button
                                                onClick={() => handleClaim(restaurant.id, item.id)}
                                                className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors duration-200"
                                            >
                                                Claim Food
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DistributorFoodNearMe; 