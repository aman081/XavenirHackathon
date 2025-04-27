import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUtensils, FaList, FaHistory, FaStar } from "react-icons/fa";
import { provider } from "../../services/api";

const ProviderHome = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await provider.getProfile();
                if (response.data) {
                    setProfile(response.data.data.provider);
                } else {
                    throw new Error("Invalid response format");
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError(
                    err.response?.data?.message || "Failed to fetch profile",
                );
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const quickActions = [
        {
            icon: <FaUtensils className="text-4xl text-emerald-500" />,
            title: "Post Food",
            description: "Share your surplus food with those in need",
            action: () => navigate("/provider/add-food"),
        },
        {
            icon: <FaList className="text-4xl text-emerald-500" />,
            title: "Active Listings",
            description: "View and manage your current food listings",
            action: () => navigate("/provider/tracking"),
        },
        {
            icon: <FaHistory className="text-4xl text-emerald-500" />,
            title: "History",
            description: "Check your past donations and activities",
            action: () => navigate("/provider/history"),
        },
    ];

    if (loading) {
        return (
            <div className="p-6 animate-pulse">
                <div className="h-8 bg-indigo-900 rounded w-1/4 mb-4"></div>
                <div className="h-32 bg-indigo-900 rounded mb-4"></div>
                <div className="h-32 bg-indigo-900 rounded mb-4"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-500">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Welcome Section */}
                <div className="bg-indigo-950 rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold text-white mb-4">
                        Welcome to Surplus
                    </h1>
                    <p className="text-lg text-indigo-200 mb-6">
                        SURPLUS is a platform dedicated to reducing food waste
                        and helping those in need by connecting food providers
                        with organizations that can distribute surplus food to
                        communities.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-indigo-900 rounded-lg p-4">
                            <h2 className="text-xl font-semibold text-white mb-2">
                                About Your Restaurant
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <span className="text-indigo-200 w-32">
                                        Name:
                                    </span>
                                    <span className="font-medium text-white">
                                        {profile?.name || "N/A"}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-indigo-200 w-32">
                                        Rating:
                                    </span>
                                    <div className="flex items-center">
                                        <FaStar className="text-yellow-400 mr-1" />
                                        <span className="font-medium text-white">
                                            {profile?.rating?.average?.toFixed(
                                                1,
                                            ) || "0.0"}
                                            /5.0
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-indigo-900 rounded-lg p-4">
                            <h2 className="text-xl font-semibold text-white mb-2">
                                Your Impact
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <span className="text-indigo-200 w-32">
                                        Total Donations:
                                    </span>
                                    <span className="font-medium text-white">
                                        {profile?.totalDonations || 0} items
                                    </span>
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
                            <h3 className="text-lg font-semibold text-white mb-1">
                                {action.title}
                            </h3>
                            <p className="text-sm text-indigo-200">
                                {action.description}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProviderHome;
