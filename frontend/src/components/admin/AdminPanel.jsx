import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { admin } from '../../api/axios';
import { toast } from 'react-hot-toast';
import Navbar from '../Common/navbar';
import Footer from '../Common/footer';

const AdminPanel = () => {
    const [unverifiedDistributors, setUnverifiedDistributors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingAction, setProcessingAction] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkAdminAuth();
    }, []);

    const checkAdminAuth = async () => {
        try {
            await admin.logout();
            fetchUnverifiedDistributors();
        } catch (error) {
            toast.error('Please login as admin first');
            navigate('/admin/login');
        }
    };

    const fetchUnverifiedDistributors = async () => {
        try {
            const response = await admin.getUnverifiedDistributors();
            console.log('Unverified distributors response:', response);
            
            if (response.data && response.data.message) {
                setUnverifiedDistributors(response.data.message);
            } else {
                setUnverifiedDistributors([]);
            }
        } catch (error) {
            console.error('Error fetching distributors:', error.response || error);
            toast.error('Failed to fetch unverified distributors');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (distributorId) => {
        if (processingAction) return;
        
        setProcessingAction(true);
        try {
            console.log('Verifying distributor:', distributorId);
            const response = await admin.verifyDistributor(distributorId);
            console.log('Verify response:', response);
            
            if (response.data && response.data.statusCode === 200) {
                toast.success('Distributor verified successfully');
                fetchUnverifiedDistributors(); // Refresh the list
            } else {
                throw new Error('Failed to verify distributor');
            }
        } catch (error) {
            console.error('Error verifying distributor:', error.response || error);
            toast.error('Failed to verify distributor');
        } finally {
            setProcessingAction(false);
        }
    };

    const handleReject = async (distributorId) => {
        if (processingAction) return;
        
        setProcessingAction(true);
        try {
            console.log('Rejecting distributor:', distributorId);
            const response = await admin.rejectDistributor(distributorId);
            console.log('Reject response:', response);
            
            if (response.data && response.data.statusCode === 200) {
                toast.success('Distributor rejected successfully');
                fetchUnverifiedDistributors(); // Refresh the list
            } else {
                throw new Error('Failed to reject distributor');
            }
        } catch (error) {
            console.error('Error rejecting distributor:', error.response || error);
            toast.error('Failed to reject distributor');
        } finally {
            setProcessingAction(false);
        }
    };

    const handleLogout = async () => {
        try {
            await admin.logout();
            toast.success('Logged out successfully');
            navigate('/admin/login');
        } catch (error) {
            toast.error('Failed to logout');
            console.error('Error logging out:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 relative overflow-hidden flex flex-col">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-400 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-500 rounded-full blur-2xl"></div>
            </div>

            <Navbar />
            <div className="flex-1 relative z-10 pt-24 px-8">
                <div className="max-w-7xl mx-auto bg-indigo-950 rounded-2xl shadow-xl p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                        >
                            Logout
                        </button>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-6">
                            Unverified Distributors
                        </h2>
                        {unverifiedDistributors.length === 0 ? (
                            <div className="bg-indigo-900 rounded-lg shadow-lg p-8 text-center text-indigo-200">
                                No unverified distributors found.
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {unverifiedDistributors.map((distributor) => (
                                    <div key={distributor._id} className="bg-indigo-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-4">
                                                <div className="w-20 h-20 rounded-full overflow-hidden">
                                                    <img 
                                                        src={distributor.avatar} 
                                                        alt={distributor.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-semibold text-white">{distributor.name}</h3>
                                                    <p className="text-indigo-200">Email: {distributor.email}</p>
                                                    <p className="text-indigo-200">Unique Identifier: {distributor.uniqueIdentifier}</p>
                                                    <p className="text-indigo-200">
                                                        Status: <span className="text-yellow-500">Unverified</span>
                                                    </p>
                                                    <p className="text-indigo-200">
                                                        Rating: {distributor.rating.average} ({distributor.rating.count} reviews)
                                                    </p>
                                                    <p className="text-indigo-200">
                                                        Registered: {new Date(distributor.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => handleVerify(distributor._id)}
                                                    disabled={processingAction}
                                                    className={`bg-emerald-500 text-white px-4 py-2 rounded-lg transition-colors duration-300 ${
                                                        processingAction ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-600'
                                                    }`}
                                                >
                                                    {processingAction ? 'Processing...' : 'Verify'}
                                                </button>
                                                <button
                                                    onClick={() => handleReject(distributor._id)}
                                                    disabled={processingAction}
                                                    className={`bg-red-500 text-white px-4 py-2 rounded-lg transition-colors duration-300 ${
                                                        processingAction ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
                                                    }`}
                                                >
                                                    {processingAction ? 'Processing...' : 'Reject'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="relative z-10 mt-8">
                <Footer />
            </div>
        </div>
    );
};

export default AdminPanel;
