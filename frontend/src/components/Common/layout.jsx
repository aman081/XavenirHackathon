import React, { useState } from "react";
import Navbar from "./navbar";
import ProviderSidebar from "./ProviderSidebar";
import DistributorSidebar from "./DistributorSidebar";
import Footer from "./footer";

const Layout = ({ children, userType }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 relative overflow-hidden flex flex-col">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-400 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-500 rounded-full blur-2xl"></div>
            </div>
            
            <Navbar />
            <div className="flex relative z-10 flex-1 min-h-0 pt-24">
                {userType === "provider" ? (
                    <ProviderSidebar onCollapse={setIsSidebarCollapsed} />
                ) : (
                    <DistributorSidebar onCollapse={setIsSidebarCollapsed} />
                )}
                <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} pt-4 pb-8`}>
                    {children}
                </main>
            </div>
            <div className="relative z-10 mt-8">
                <Footer />
            </div>
        </div>
    );
};

export default Layout; 