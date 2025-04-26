import React, { useState } from 'react';
import { FaUtensils, FaPlus, FaTrash, FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';

const ProviderAddFood = () => {
    const [foodItems, setFoodItems] = useState([
        {
            foodName: '',
            foodType: '',
            numberOfPeople: '',
            preferredPickupTime: '',
            location: ''
        }
    ]);

    const handleChange = (index, field, value) => {
        const updatedItems = [...foodItems];
        updatedItems[index] = {
            ...updatedItems[index],
            [field]: value
        };
        setFoodItems(updatedItems);
    };

    const addFoodItem = () => {
        setFoodItems([
            ...foodItems,
            {
                foodName: '',
                foodType: '',
                numberOfPeople: '',
                preferredPickupTime: '',
                location: ''
            }
        ]);
    };

    const removeFoodItem = (index) => {
        const updatedItems = foodItems.filter((_, i) => i !== index);
        setFoodItems(updatedItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Filter out any empty items before submitting
        const validItems = foodItems.filter(item => 
            item.foodName && item.foodType && item.numberOfPeople && item.preferredPickupTime && item.location
        );
        
        if (validItems.length === 0) {
            alert('Please add at least one food item');
            return;
        }

        console.log('Submitting food items:', validItems);
        // TODO: Send data to backend
    };

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <FaUtensils className="text-emerald-500 text-3xl mr-4" />
                    <h1 className="text-3xl font-bold text-emerald-500">Add Food Items</h1>
                </div>

                <div className="bg-indigo-950 rounded-xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {foodItems.map((item, index) => (
                            <div key={index} className="border-2 border-indigo-900 rounded-xl p-6 space-y-6 hover:border-emerald-500/30 transition-all duration-300">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold text-white">Food Item {index + 1}</h3>
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFoodItem(index)}
                                            className="text-red-400 hover:text-red-300 transition-colors duration-200"
                                        >
                                            <FaTrash className="text-xl" />
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor={`foodName-${index}`} className="block text-sm font-medium text-indigo-200 mb-2">Food Name</label>
                                        <input
                                            type="text"
                                            id={`foodName-${index}`}
                                            value={item.foodName}
                                            onChange={(e) => handleChange(index, 'foodName', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-indigo-900 bg-indigo-900 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-lg p-3"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor={`foodType-${index}`} className="block text-sm font-medium text-indigo-200 mb-2">Food Type</label>
                                        <select
                                            id={`foodType-${index}`}
                                            value={item.foodType}
                                            onChange={(e) => handleChange(index, 'foodType', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-indigo-900 bg-indigo-900 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-lg p-3"
                                            required
                                        >
                                            <option value="">Select food type</option>
                                            <option value="vegetarian">Vegetarian</option>
                                            <option value="non-vegetarian">Non-Vegetarian</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor={`numberOfPeople-${index}`} className="block text-sm font-medium text-indigo-200 mb-2">Sufficient For</label>
                                        <input
                                            type="number"
                                            id={`numberOfPeople-${index}`}
                                            value={item.numberOfPeople}
                                            onChange={(e) => handleChange(index, 'numberOfPeople', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-indigo-900 bg-indigo-900 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-lg p-3"
                                            placeholder="20 persons"
                                            min="1"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor={`location-${index}`} className="block text-sm font-medium text-indigo-200 mb-2">Pickup Location</label>
                                        <div className="relative">
                                            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" />
                                            <input
                                                type="text"
                                                id={`location-${index}`}
                                                value={item.location}
                                                onChange={(e) => handleChange(index, 'location', e.target.value)}
                                                className="mt-1 block w-full rounded-lg border-indigo-900 bg-indigo-900 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-lg p-3 pl-10"
                                                placeholder="Enter pickup location"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor={`pickupTime-${index}`} className="block text-sm font-medium text-indigo-200 mb-2">Preferred Pickup Time</label>
                                        <div className="relative">
                                            <input
                                                type="time"
                                                id={`pickupTime-${index}`}
                                                value={item.preferredPickupTime}
                                                onChange={(e) => handleChange(index, 'preferredPickupTime', e.target.value)}
                                                className="mt-1 block w-full rounded-lg border-indigo-900 bg-indigo-900 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-lg p-3"
                                                required
                                            />
                                            <FaClock className="absolute right-3 top-3 text-indigo-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-between pt-6">
                            <button
                                type="button"
                                onClick={addFoodItem}
                                className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
                            >
                                <FaPlus className="mr-2" />
                                Add Another Item
                            </button>

                            <button
                                type="submit"
                                className="inline-flex items-center px-8 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
                            >
                                Submit All Items
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProviderAddFood; 