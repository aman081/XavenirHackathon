import React, { useEffect, useState } from "react";
import { FaEnvelope, FaSearch, FaStar, FaUser, FaCheck } from "react-icons/fa"; // <-- Added FaCheck icon
import { provider } from "../../api/axios"; // assuming same axios instance
import { useLocation } from "react-router-dom";

const RecipientsList = () => {
    const location = useLocation();
    const { supplyId } = location.state;

    const [recipients, setRecipients] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchRecipients = async () => {
            try {
                const response = await provider.showRecipients(supplyId);
                if (
                    response.data &&
                    response.data.data &&
                    response.data.data.recepients
                ) {
                    console.log(response);
                    setRecipients(response.data.data.recepients);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (error) {
                console.error("Error fetching recipients:", error);
            }
        };

        fetchRecipients();
    }, []);

    const handleAccept = async (distributorId) => {
        console.log(supplyId, distributorId);
        
        try {
            const response = await provider.chooseDistributor(
                supplyId,
                distributorId,
            );
            console.log("Recipient accepted:", response);
            setRecipients((prev) =>
                prev.filter((r) => r._id !== distributorId),
            );
        } catch (error) {
            console.error("Error accepting recipient:", error);
        }
    };

    const filteredRecipients = recipients.filter((recipient) =>
        recipient.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <FaUser className="text-emerald-500 text-3xl mr-4" />
                    <h1 className="text-3xl font-bold text-emerald-500">
                        Recipients List
                    </h1>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search recipients by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-indigo-900 text-white placeholder-indigo-300 rounded-lg py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300" />
                    </div>
                </div>

                {/* Recipients Grid */}
                <div className="space-y-6">
                    {filteredRecipients.map((recipient) => (
                        <div
                            key={recipient._id}
                            className="bg-indigo-950 rounded-xl shadow-lg overflow-hidden border border-indigo-900 flex items-center p-4"
                        >
                            <img
                                src={recipient.avatar}
                                alt={recipient.name}
                                className="w-16 h-16 rounded-full object-cover mr-6"
                            />
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-white">
                                    {recipient.name}
                                </h2>
                                <div className="flex items-center mt-2 text-indigo-200 text-sm">
                                    <FaEnvelope className="text-emerald-500 mr-2" />
                                    {recipient.email}
                                </div>
                                <div className="flex items-center mt-2 text-indigo-200 text-sm">
                                    <FaStar className="text-emerald-500 mr-2" />
                                    Rating: {recipient.rating?.average ?? 0} ⭐
                                    ({recipient.rating?.count ?? 0} ratings)
                                </div>
                            </div>
                            {/* Accept Button */}
                            <button
                                onClick={() => handleAccept(recipient?._id)}
                                className="ml-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center"
                            >
                                <FaCheck className="mr-2" />
                                Accept
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecipientsList;
