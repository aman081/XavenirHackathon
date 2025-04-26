import React from 'react';
import { FaHistory, FaMapMarkerAlt, FaClock, FaCheckCircle, FaUtensils, FaLeaf, FaDrumstickBite, FaUsers } from 'react-icons/fa';

const DistributorHistory = () => {
    // Dummy data for delivery history (will be replaced with database data)
    const deliveryHistory = [
        {
            id: 1,
            restaurantName: "Taj Hotel, Mumbai",
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
            ],
            pickupTime: "2024-03-15, 2:00 PM",
            deliveryLocation: "Mumbai Homeless Shelter",
            deliveryDate: "2024-03-15"
        },
        {
            id: 2,
            restaurantName: "Grand Hyatt, Mumbai",
            foodItems: [
                {
                    id: 3,
                    foodName: "Paneer Tikka",
                    foodType: "vegetarian",
                    sufficientFor: 20
                }
            ],
            pickupTime: "2024-03-14, 3:30 PM",
            deliveryLocation: "Children's Orphanage",
            deliveryDate: "2024-03-14"
        }
    ];

    if (deliveryHistory.length === 0) {
        return (
            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center mb-8">
                        <FaHistory className="text-emerald-500 text-3xl mr-4" />
                        <h1 className="text-3xl font-bold text-emerald-500">Delivery History</h1>
                    </div>

                    <div className="bg-indigo-950 rounded-xl shadow-lg p-8">
                        <div className="flex flex-col items-center justify-center text-center p-8">
                            <FaHistory className="text-indigo-400 text-5xl mb-4" />
                            <h2 className="text-xl font-semibold text-emerald-500 mb-2">No Delivery History</h2>
                            <p className="text-indigo-200">Your completed deliveries will appear here.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <FaHistory className="text-emerald-500 text-3xl mr-4" />
                    <h1 className="text-3xl font-bold text-emerald-500">Delivery History</h1>
                </div>

                <div className="space-y-6">
                    {deliveryHistory.map((delivery) => (
                        <div key={delivery.id} className="bg-indigo-950 rounded-xl shadow-lg overflow-hidden border border-indigo-900">
                            {/* Delivery Header */}
                            <div className="bg-indigo-900 p-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="text-emerald-500 mr-3" />
                                    <h2 className="text-xl font-semibold text-white">{delivery.restaurantName}</h2>
                                </div>
                                <div className="flex items-center">
                                    <FaCheckCircle className="text-emerald-500" />
                                    <span className="ml-2 text-indigo-200">Delivered on {delivery.deliveryDate}</span>
                                </div>
                            </div>

                            {/* Food Items and Details */}
                            <div className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    {delivery.foodItems.map((food) => (
                                        <div key={food.id} className="bg-indigo-900 rounded-lg p-4">
                                            <div className="flex items-start mb-3">
                                                <div className="bg-indigo-950 p-2 rounded-lg mr-3">
                                                    <FaUtensils className="text-emerald-500" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">{food.foodName}</h3>
                                                    <div className="flex items-center mt-1">
                                                        {food.foodType === 'vegetarian' ? (
                                                            <FaLeaf className="text-emerald-500 mr-1" />
                                                        ) : (
                                                            <FaDrumstickBite className="text-emerald-500 mr-1" />
                                                        )}
                                                        <span className="text-indigo-200 text-sm">
                                                            {food.foodType === 'vegetarian' ? 'Vegetarian' : 'Non-Vegetarian'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center text-indigo-200">
                                                <FaUsers className="text-emerald-500 mr-2" />
                                                <span>Sufficient for {food.sufficientFor} persons</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pickup and Delivery Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-indigo-900 rounded-lg p-4">
                                        <div className="flex items-center text-indigo-200 mb-2">
                                            <FaClock className="text-emerald-500 mr-2" />
                                            <span>Pickup Time: {delivery.pickupTime}</span>
                                        </div>
                                    </div>
                                    <div className="bg-indigo-900 rounded-lg p-4">
                                        <div className="flex items-center text-indigo-200">
                                            <FaMapMarkerAlt className="text-emerald-500 mr-2" />
                                            <span>Delivered to: {delivery.deliveryLocation}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DistributorHistory; 