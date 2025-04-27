import React, { useEffect, useState } from "react";
import {
    FaDrumstickBite,
    FaLeaf,
    FaMapMarkerAlt,
    FaSearch,
    FaUsers,
} from "react-icons/fa";
import { distributor } from "../../api/axios";

const DistributorFoodNearMe = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState(null);
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by this browser.");
            setLocation({ lat: 20.5937, lng: 78.9629 });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error("Error getting location:", error);
                setLocation({ lat: 20.5937, lng: 78.9629 });
            },
        );
    }, []);

    useEffect(() => {
        if (!location) return; // Wait until location is set

        const getNearBySupplies = async () => {
            try {
                const response = await distributor.getSuppliesNearMe(
                    location.lat,
                    location.lng,
                );
                if (response.data && response.data.data) {
                    const mappedData = response.data.data.map((item) => ({
                        id: item._id,
                        name: `Provider`, // You can customize it
                        location: item.providerLocation.coordinates,
                        foodItems: item.food.map((foodItem) => ({
                            id: foodItem._id,
                            foodName: foodItem.name,
                            foodType:
                                foodItem.category === "Veg"
                                    ? "vegetarian"
                                    : "non-vegetarian",
                            sufficientFor: foodItem.quantity,
                            image: item.providerSupplyPhoto,
                        })),
                    }));
                    setRestaurants(mappedData);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (error) {
                console.error("Error fetching nearby supplies:", error);
            }
        };

        getNearBySupplies();
    }, [location]);

    const handleClaim = async (restaurantId) => {
        try {
            await distributor.selectSupply(restaurantId);
        } catch (error) {
            console.error("Error claiming supply:", error);
        }
    };

    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.foodItems.some((item) =>
            item.foodName.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <FaSearch className="text-emerald-500 text-3xl mr-4" />
                    <h1 className="text-3xl font-bold text-emerald-500">
                        Food Near Me
                    </h1>
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
                    {filteredRestaurants.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            className="bg-indigo-950 rounded-xl shadow-lg overflow-hidden border border-indigo-900"
                        >
                            {/* Restaurant Header */}
                            <div className="bg-indigo-900 p-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="text-emerald-500 mr-3" />
                                    <h2 className="text-xl font-semibold text-white">
                                        {restaurant.name}
                                    </h2>
                                </div>
                            </div>

                            {/* Food Items Grid */}
                            <div className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {restaurant.foodItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="bg-indigo-900 rounded-lg p-4 hover:bg-indigo-800/50 transition-colors duration-200"
                                        >
                                            {/* Food Item */}
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center">
                                                    <img
                                                        src={item.image}
                                                        alt={item.foodName}
                                                        className="w-12 h-12 rounded-lg mr-3 object-cover"
                                                    />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">
                                                            {item.foodName}
                                                        </h3>
                                                        <div className="flex items-center mt-1">
                                                            {item.foodType ===
                                                            "vegetarian" ? (
                                                                <FaLeaf className="text-emerald-500 mr-1" />
                                                            ) : (
                                                                <FaDrumstickBite className="text-emerald-500 mr-1" />
                                                            )}
                                                            <span className="text-indigo-200 text-sm">
                                                                {item.foodType ===
                                                                "vegetarian"
                                                                    ? "Vegetarian"
                                                                    : "Non-Vegetarian"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center text-indigo-200 mb-4">
                                                <FaUsers className="text-emerald-500 mr-2" />
                                                <span>
                                                    Sufficient for{" "}
                                                    {item.sufficientFor} persons
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <button
                                        onClick={() =>
                                            handleClaim(
                                                restaurant.id,
                                                restaurant.foodItems.length > 0
                                                    ? restaurant.foodItems[0].id
                                                    : null,
                                            )
                                        }
                                        className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors duration-200"
                                    >
                                        Claim Food
                                    </button>
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
