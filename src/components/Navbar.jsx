import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';



function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-purple-600">EventBooking</Link>

            <div className="flex items-center gap-4">
                <Link to="/cart" className="text-gray-700 hover:text-purple-600">Cart</Link>
                {user ? (
                    <>
                        <Link to="profile" className="text-gray-700 hover:text-purple-600">Profile</Link>
                        <button onClick={logout} className="text-red-500 hover:underline">Logout</button>
                        </>
                ) : (
                    <>
                    <Link to="login" className="text-gray-700 hover:text-purple-600">Login</Link>
                    <Link to="/signup" className="text-gray-700 hover:text-purple-600">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;