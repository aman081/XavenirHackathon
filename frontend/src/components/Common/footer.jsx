import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
    const [expandedSections, setExpandedSections] = useState({
        quickLinks: false,
        legal: false,
        contact: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <button 
                            onClick={() => toggleSection('quickLinks')}
                            className="w-full text-left flex items-center justify-between text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors duration-200 focus:outline-none"
                        >
                            <span>Quick Links</span>
                            {expandedSections.quickLinks ? 
                                <FaChevronUp className="w-4 h-4 text-emerald-400" /> : 
                                <FaChevronDown className="w-4 h-4 text-gray-400" />
                            }
                        </button>
                        {expandedSections.quickLinks && (
                            <ul className="mt-3 space-y-2 pl-2 border-l-2 border-emerald-400">
                                <li>
                                    <a href="/about" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-200">
                                        About
                                    </a>
                                </li>
                            </ul>
                        )}
                    </div>
                    <div>
                        <button 
                            onClick={() => toggleSection('legal')}
                            className="w-full text-left flex items-center justify-between text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors duration-200 focus:outline-none"
                        >
                            <span>Legal</span>
                            {expandedSections.legal ? 
                                <FaChevronUp className="w-4 h-4 text-emerald-400" /> : 
                                <FaChevronDown className="w-4 h-4 text-gray-400" />
                            }
                        </button>
                        {expandedSections.legal && (
                            <ul className="mt-3 space-y-2 pl-2 border-l-2 border-emerald-400">
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-200">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-200">
                                        Terms of Service
                                    </a>
                                </li>
                            </ul>
                        )}
                    </div>
                    <div>
                        <button 
                            onClick={() => toggleSection('contact')}
                            className="w-full text-left flex items-center justify-between text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors duration-200 focus:outline-none"
                        >
                            <span>Contact Us</span>
                            {expandedSections.contact ? 
                                <FaChevronUp className="w-4 h-4 text-emerald-400" /> : 
                                <FaChevronDown className="w-4 h-4 text-gray-400" />
                            }
                        </button>
                        {expandedSections.contact && (
                            <ul className="mt-3 space-y-2 pl-2 border-l-2 border-emerald-400">
                                <li className="flex items-center text-gray-400 text-sm">
                                    <FaEnvelope className="w-4 h-4 mr-2 text-emerald-400" />
                                    support@foodshare.com
                                </li>
                                <li className="flex items-center text-gray-400 text-sm">
                                    <FaPhone className="w-4 h-4 mr-2 text-emerald-400" />
                                    +91 9508653461
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-800 text-center">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} FoodShare. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
