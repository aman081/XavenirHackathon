import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Common/layout";
import HomePage from "./components/home/HomePage";
import AdminLogin from "./components/auth/AdminLogin";
import ProviderReg from "./components/auth/ProviderReg";
import ProviderLogin from "./components/auth/ProviderLogin";
import DistributorReg from "./components/auth/DistributorReg";
import DistributorLogin from "./components/auth/DistributorLogin";
import ProviderHome from "./components/provider/ProviderHome";
import DistributorHome from "./components/distributor/DistributorHome";
import ProviderHistory from "./components/provider/ProviderHistory";
import ProviderAddFood from "./components/provider/ProviderAddFood";
import ProviderTracking from "./components/provider/ProviderTracking";
import DistributorFoodNearMe from "./components/distributor/DistributorFoodNearMe";
import DistributorTracking from "./components/distributor/DistributorTracking";
import DistributorHistory from './components/distributor/DistributorHistory';
import Home1 from './components/home/home1';

const App = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home1 />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<div>About Page</div>} />
                
                {/* Auth Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/provider/register" element={<ProviderReg />} />
                <Route path="/provider/login" element={<ProviderLogin />} />
                <Route path="/distributor/register" element={<DistributorReg />} />
                <Route path="/distributor/login" element={<DistributorLogin />} />
                
                {/* Protected Provider Routes */}
                <Route path="/provider" element={<Navigate to="/provider/home" replace />} />
                <Route path="/provider/*" element={
                    <Layout userType="provider">
                        <Routes>
                            <Route path="home" element={<ProviderHome />} />
                            <Route path="history" element={<ProviderHistory />} />
                            <Route path="add-food" element={<ProviderAddFood />} />
                            <Route path="tracking" element={<ProviderTracking />} />
                        </Routes>
                    </Layout>
                } />
                
                {/* Protected Distributor Routes */}
                <Route path="/distributor" element={<Navigate to="/distributor/home" replace />} />
                <Route path="/distributor/*" element={
                    <Layout userType="distributor">
                        <Routes>
                            <Route index element={<Navigate to="home" replace />} />
                            <Route path="home" element={<DistributorHome />} />
                            <Route path="food-near-me" element={<DistributorFoodNearMe />} />
                            <Route path="tracking" element={<DistributorTracking />} />
                            <Route path="history" element={<DistributorHistory />} />
                        </Routes>
                    </Layout>
                } />
                
                {/* 404 Route */}
                <Route path="*" element={<div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
                        <p className="text-gray-600 mb-8">The page you are looking for doesn't exist or has been moved.</p>
                        <a href="/" className="text-indigo-600 hover:text-indigo-800">Return to Home</a>
                    </div>
                </div>} />
            </Routes>
        </div>
    );
};

export default App;
