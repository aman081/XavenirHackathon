import React from 'react';
import { FaTruck, FaCheckCircle, FaClock, FaTimesCircle, FaMapMarkerAlt, FaSpinner, FaUtensils, FaLeaf, FaDrumstickBite } from 'react-icons/fa';

const DistributorTracking = () => {
    // Dummy data for tracking items (empty array for no confirmations)
    const trackingItems = [];

    // Dummy data for when items are confirmed (commented out for now)
    /*
    const trackingItems = [
        {
            id: 1,
            restaurantName: "Taj Hotel, Mumbai",
            foodItems: [
                {
                    id: 1,
                    foodName: "Vegetable Biryani",
                    foodType: "vegetarian",
                    sufficientFor: 25
                }
            ],
            status: "in-progress",
            pickupTime: "Today, 2:00 PM",
            deliveryLocation: "Mumbai Homeless Shelter"
        },
        {
            id: 2,
            restaurantName: "Grand Hyatt, Mumbai",
            foodItems: [
                {
                    id: 2,
                    foodName: "Chicken Curry",
                    foodType: "non-vegetarian",
                    sufficientFor: 30
                }
            ],
            status: "completed",
            pickupTime: "Today, 3:30 PM",
            deliveryLocation: "Children's Orphanage"
        }
    ];
    */

    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return <FaCheckCircle className="text-emerald-500" />;
            case "in-progress":
                return <FaSpinner className="text-yellow-500 animate-spin" />;
            case "pending":
                return <FaTimesCircle className="text-red-500" />;
            default:
                return null;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "completed":
                return "Delivered";
            case "in-progress":
                return "In Transit";
            case "pending":
                return "Pending Pickup";
            default:
                return status;
        }
    };

    if (trackingItems.length === 0) {
        return (
            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center mb-8">
                        <FaTruck className="text-emerald-500 text-3xl mr-4" />
                        <h1 className="text-3xl font-bold text-emerald-500">Delivery Tracking</h1>
                    </div>

                    <div className="bg-indigo-950 rounded-xl shadow-lg p-8">
                        <div className="flex flex-col items-center justify-center text-center p-8">
                            <FaTruck className="text-indigo-400 text-5xl mb-4" />
                            <h2 className="text-xl font-semibold text-emerald-500 mb-2">No Food Confirmations to Track</h2>
                            <p className="text-indigo-200">Once restaurants approve your food claims, they will appear here for tracking.</p>
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
                    <FaTruck className="text-emerald-500 text-3xl mr-4" />
                    <h1 className="text-3xl font-bold text-emerald-500">Delivery Tracking</h1>
                </div>

                <div className="space-y-6">
                    {trackingItems.map((item) => (
                        <div key={item.id} className="bg-indigo-950 rounded-xl shadow-lg overflow-hidden border border-indigo-900">
                            {/* Restaurant Header */}
                            <div className="bg-indigo-900 p-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="text-emerald-500 mr-3" />
                                    <h2 className="text-xl font-semibold text-white">{item.restaurantName}</h2>
                                </div>
                                <div className="flex items-center">
                                    {getStatusIcon(item.status)}
                                    <span className="ml-2 text-indigo-200">{getStatusText(item.status)}</span>
                                </div>
                            </div>

                            {/* Food Items and Details */}
                            <div className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    {item.foodItems.map((food) => (
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
                                            <span>Pickup Time: {item.pickupTime}</span>
                                        </div>
                                    </div>
                                    <div className="bg-indigo-900 rounded-lg p-4">
                                        <div className="flex items-center text-indigo-200">
                                            <FaMapMarkerAlt className="text-emerald-500 mr-2" />
                                            <span>Delivery Location: {item.deliveryLocation}</span>
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

export default DistributorTracking; 