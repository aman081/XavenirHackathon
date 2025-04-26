import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaHistory, FaUtensils, FaTruck, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProviderSidebar = ({ onCollapse }) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const location = useLocation();

    const handleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        onCollapse(newState);
    };

    const menuItems = [
        { path: '/provider/home', icon: <FaHome />, label: 'Home' },
        { path: '/provider/history', icon: <FaHistory />, label: 'History' },
        { path: '/provider/add-food', icon: <FaUtensils />, label: 'Donate Food' },
        { path: '/provider/tracking', icon: <FaTruck />, label: 'Tracking' }
    ];

    return (
        <div className={`bg-indigo-950 text-white h-screen fixed left-0 top-20 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            {/* Toggle Button */}
            <button
                onClick={handleCollapse}
                className="absolute -right-4 top-6 bg-emerald-500 text-white p-2 rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-200 transform hover:scale-110 z-20"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                {isCollapsed ? <FaChevronRight className="h-4 w-4" /> : <FaChevronLeft className="h-4 w-4" />}
            </button>
            
            <div className="mt-8 space-y-2 px-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center p-4 relative overflow-hidden transition-all duration-300 group rounded-lg ${
                            location.pathname === item.path 
                                ? 'bg-indigo-900 text-emerald-400 shadow-lg' 
                                : 'hover:bg-indigo-900/50 text-indigo-200 hover:text-white'
                        }`}
                    >
                        {/* Active indicator */}
                        {location.pathname === item.path && (
                            <div className="absolute left-0 top-0 h-full w-1 bg-emerald-400 transform origin-left transition-transform duration-300" />
                        )}
                        
                        {/* Icon with transition */}
                        <span className={`text-xl transition-transform duration-300 ${
                            location.pathname === item.path ? 'scale-110' : 'group-hover:scale-110'
                        }`}>
                            {item.icon}
                        </span>
                        
                        {/* Label with rising effect */}
                        {!isCollapsed && (
                            <span className={`ml-4 transition-all duration-300 transform ${
                                location.pathname === item.path 
                                    ? 'font-semibold' 
                                    : 'font-normal group-hover:-translate-y-0.5'
                            }`}>
                                {item.label}
                            </span>
                        )}
                    </Link>
                ))}
            </div>

            {/* User Info Section */}
            <div className="absolute bottom-0 w-full p-4 bg-indigo-900">
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                        <span className="text-indigo-950 font-bold">P</span>
                    </div>
                    {!isCollapsed && (
                        <div className="ml-4">
                            <p className="text-sm font-medium text-white">Provider</p>
                            <p className="text-xs text-indigo-300">Restaurant/Hotel</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProviderSidebar; 