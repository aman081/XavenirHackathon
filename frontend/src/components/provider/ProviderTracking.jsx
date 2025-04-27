import React from "react";
import { FaTruck, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const ProviderTracking = () => {
    // Empty data array since we're not connected to backend yet
    const trackingItems = [];

    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return <FaCheckCircle className="text-emerald-500" />;
            case "in-transit":
                return <FaTruck className="text-blue-500" />;
            case "scheduled":
                return <FaClock className="text-yellow-500" />;
            case "cancelled":
                return <FaTimesCircle className="text-red-500" />;
            default:
                return null;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "completed":
                return "Completed";
            case "in-transit":
                return "In Transit";
            case "scheduled":
                return "Scheduled";
            case "cancelled":
                return "Cancelled";
            default:
                return status;
        }
    };

    if (trackingItems.length === 0) {
        return (
            <div className="p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center mb-8">
                        <FaTruck className="text-emerald-500 text-3xl mr-4" />
                        <h1 className="text-3xl font-bold text-emerald-500">
                            Food Tracking
                        </h1>
                    </div>
                    <div className="bg-indigo-950 rounded-xl shadow-lg p-8">
                        <div className="flex flex-col items-center justify-center text-center p-8">
                            <FaTruck className="text-indigo-400 text-5xl mb-4" />
                            <h2 className="text-xl font-semibold text-emerald-500 mb-2">
                                No Food Donations to Track
                            </h2>
                            <p className="text-indigo-200">
                                When you add food donations, they will appear
                                here for tracking.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <FaTruck className="text-emerald-500 text-3xl mr-4" />
                    <h1 className="text-3xl font-bold text-emerald-500">
                        Food Tracking
                    </h1>
                </div>

                <div className="bg-indigo-950 rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-indigo-900">
                            <thead className="bg-indigo-900">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-200 uppercase tracking-wider">
                                        Food Item
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-200 uppercase tracking-wider">
                                        Sufficient For
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-200 uppercase tracking-wider">
                                        Pickup Time
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-200 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-200 uppercase tracking-wider">
                                        Distributor
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-200 uppercase tracking-wider">
                                        Location
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-indigo-950 divide-y divide-indigo-900">
                                {trackingItems.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-indigo-900/50 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                            {item.foodName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-200">
                                            {item.numberOfPeople} persons
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-200">
                                            {item.preferredPickupTime}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {getStatusIcon(item.status)}
                                                <span className="ml-2 text-sm text-indigo-200">
                                                    {getStatusText(item.status)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-200">
                                            {item.distributor}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-200">
                                            {item.location}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderTracking;
