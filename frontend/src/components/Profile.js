import React, { useState, useEffect, useContext } from 'react';
import  UserContext from '../context/UserContext';
import Header from "../components/layout/Header/Header"

const ProfileComponent = () => {
    const {user, setUser} = useContext(UserContext);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPassword, setNewPassword] = useState('');

   
      

    const fetchOrders = async () => {
        // Dummy data for orders; replace with an actual API call
        const userOrders = [
            { id: 1, name: 'Order #1', status: 'Delivered', date: 'Oct 15, 2024' },
            { id: 2, name: 'Order #2', status: 'In Progress', date: 'Oct 20, 2024' },
        ];
        setOrders(userOrders);
        setLoading(false);
    };

    // const handleLogout = async () => {
    //     await logoutUser();
    //     // Redirect or perform any action after logout
    // };

    // const handleResetPassword = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await resetPassword({ password: newPassword });
    //         alert('Password reset successful');
    //         setNewPassword(''); // Clear password input after successful reset
    //     } catch (error) {
    //         console.error('Reset password error:', error);
    //     }
    // };

    return (
        <>
        <Header/>

        {(!user && (<>  <div>
            <p>User Not logged in</p>
            
            </div> </>))}
        {
            user &&
        
        <div className="bg-gray-100 min-h-screen py-10">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
                {/* User Info */}
                <div className="border-b pb-6 mb-6">
                    <h1 className="text-3xl font-semibold mb-2">Your Profile</h1>
                    <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold">
                            {user?.name?.charAt(0)}
                        </div>
                        <div>
                            <p className="text-lg font-medium">{user?.name}</p>
                            <p className="text-gray-500">{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Orders Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
                    {loading ? (
                        <p className="text-gray-500">Loading orders...</p>
                    ) : orders.length === 0 ? (
                        <p className="text-gray-500">You haven't made any orders yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div
                                key={order.id}
                                className="border rounded-lg p-4 hover:shadow transition-shadow"
                                >
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="text-lg font-medium">{order.name}</h3>
                                            <p className="text-sm text-gray-500">{order.date}</p>
                                        </div>
                                        <p
                                            className={`${
                                                order.status === 'Delivered'
                                                ? 'text-green-600'
                                                : 'text-yellow-500'
                                            } font-medium`}
                                            >
                                            {order.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Reset Password Section */}
                <form  className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        className="border border-gray-300 rounded-md p-2 w-full mb-4"
                        required
                        />
                    {/* {error && <p className="text-red-500">{error}</p>} Display error message */}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors"
                        >
                        Reset Password
                    </button>
                </form>

                {/* Account Actions */}
                <div className="border-t pt-6">
                    <button
                        className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition-colors"
                        
                        >
                        Logout
                    </button>
                </div>
            </div>
        </div>
        }
        </>
    );
};

export default ProfileComponent;
