import React, { useState } from 'react';
import { FaUtensils, FaPlus, FaTrash, FaMapMarkerAlt } from 'react-icons/fa';
import { provider } from "../../services/api";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ setLocation }) => {
    const map = useMapEvents({
        click(e) {
            setLocation({
                latitude: e.latlng.lat,
                longitude: e.latlng.lng
            });
        }
    });
    return null;
};

const ProviderAddFood = () => {
    const [foodItems, setFoodItems] = useState([
        {
            name: '',
            category: 'Veg',
            quantity: ''
        }
    ]);
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        address: ''
    });
    const [foodPhoto, setFoodPhoto] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default to India center

    const handleChange = (index, field, value) => {
        const updatedItems = [...foodItems];
        updatedItems[index] = {
            ...updatedItems[index],
            [field]: value
        };
        setFoodItems(updatedItems);
    };

    const handleLocationSearch = async (address) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
            const data = await response.json();
            
            if (data && data.length > 0) {
                const { lat, lon, display_name } = data[0];
                setLocation({
                    latitude: parseFloat(lat),
                    longitude: parseFloat(lon),
                    address: display_name
                });
                setMapCenter([parseFloat(lat), parseFloat(lon)]);
            } else {
                setError('Location not found. Please try a different address.');
            }
        } catch (err) {
            setError('Error searching for location. Please try again.');
        }
    };

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFoodPhoto(e.target.files[0]);
        }
    };

    const addFoodItem = () => {
        setFoodItems([
            ...foodItems,
            {
                name: '',
                category: 'Veg',
                quantity: ''
            }
        ]);
    };

    const removeFoodItem = (index) => {
        const updatedItems = foodItems.filter((_, i) => i !== index);
        setFoodItems(updatedItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        
        // Validate location
        if (!location.latitude || !location.longitude) {
            setError('Please select a location on the map');
            return;
        }

        // Validate food items
        const validItems = foodItems.filter(item => 
            item.name && item.category && item.quantity
        );
        
        if (validItems.length === 0) {
            setError('Please add at least one food item');
            return;
        }

        // Validate photo
        if (!foodPhoto) {
            setError('Please upload a photo of the food');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('foods', JSON.stringify(validItems));
            formData.append('providerLatitude', location.latitude);
            formData.append('providerLongitude', location.longitude);
            formData.append('foodPhoto', foodPhoto);

            const response = await provider.supplyFood(formData);
            if (response.data) {
                setSuccess("Food items added successfully!");
                setFoodItems([{
                    name: '',
                    category: 'Veg',
                    quantity: ''
                }]);
                setLocation({ latitude: null, longitude: null, address: '' });
                setFoodPhoto(null);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add food items. Please try again.");
        }
    };

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <FaUtensils className="text-emerald-500 text-3xl mr-4" />
                    <h1 className="text-3xl font-bold text-emerald-500">Add Food Items</h1>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500 rounded-lg text-emerald-200">
                        {success}
                    </div>
                )}

                <div className="bg-indigo-950 rounded-xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Food Items Section */}
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
                                        <label className="block text-sm font-medium text-indigo-200 mb-2">Food Name</label>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-indigo-900 bg-indigo-900 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-lg p-3"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-indigo-200 mb-2">Food Type</label>
                                        <select
                                            value={item.category}
                                            onChange={(e) => handleChange(index, 'category', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-indigo-900 bg-indigo-900 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-lg p-3"
                                            required
                                        >
                                            <option value="Veg">Vegetarian</option>
                                            <option value="Non-veg">Non-Vegetarian</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-indigo-200 mb-2">Quantity (sufficient for)</label>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                            className="mt-1 block w-full rounded-lg border-indigo-900 bg-indigo-900 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-lg p-3"
                                            placeholder="10 persons"
                                            min="1"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Location Section */}
                        <div className="border-2 border-indigo-900 rounded-xl p-6 space-y-6 hover:border-emerald-500/30 transition-all duration-300">
                            <h3 className="text-xl font-semibold text-white">Location</h3>
                            <div className="space-y-4">
                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" />
                                    <input
                                        type="text"
                                        value={location.address}
                                        onChange={(e) => setLocation(prev => ({ ...prev, address: e.target.value }))}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleLocationSearch(location.address);
                                            }
                                        }}
                                        className="w-full rounded-lg border-indigo-900 bg-indigo-900 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-lg p-3 pl-10"
                                        placeholder="Enter your location"
                                    />
                                </div>
                                <div className="h-64 rounded-lg overflow-hidden">
                                    <MapContainer 
                                        center={mapCenter} 
                                        zoom={13} 
                                        style={{ height: '100%', width: '100%' }}
                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        />
                                        {location.latitude && location.longitude && (
                                            <Marker position={[location.latitude, location.longitude]} />
                                        )}
                                        <LocationMarker setLocation={setLocation} />
                                    </MapContainer>
                                </div>
                            </div>
                        </div>

                        {/* Food Photo Section */}
                        <div className="border-2 border-indigo-900 rounded-xl p-6 space-y-6 hover:border-emerald-500/30 transition-all duration-300">
                            <h3 className="text-xl font-semibold text-white">Food Photo</h3>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="mt-1 block w-full rounded-lg border-indigo-900 bg-indigo-900 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-lg p-3"
                                required
                            />
                        </div>

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