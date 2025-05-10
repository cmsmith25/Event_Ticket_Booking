import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


//Navigation panel
function Navbar() {
    const { user, logout } = useAuth();


    //Shows nav bar
    return (
        <nav className="bg-gray-700 text-gray-200 p-4 flex justify-between items-center">
            {/*page logo with link to home page*/}
            <Link to="/" className="text-2xl font-bold text-green-400">EventsForYou</Link>


            {/*Navigation links*/}
            <div className="flex items-center gap-4">
                <Link to="/" className="text-gray-300 hover:text-blue-400">Home</Link>
                <Link to="/cart" className="text-gray-300 hover:text-blue-400">Cart</Link>
                {user ? (
                    //If valid user, links to profile page or logout
                    <>
                        <Link to="/profile" className="text-gray-300 hover:text-blue-400">Profile</Link>
                        <button onClick={logout} className="text-red-500 hover:underline">Logout</button>
                        </>
                ) : (
                    //If not valid user, links to login or signup
                    <>
                    <Link to="/login" className="text-gray-300 hover:text-blue-400">Login</Link>
                    <Link to="/signup" className="text-gray-300 hover:text-blue-400">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;

//done