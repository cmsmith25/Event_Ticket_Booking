import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth } from '../utils/firebase';


//Login panel
function Login() {
    //State for user input and errors
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    //handles form submit and login for Firebase
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await signInWithEmailAndPassword(auth,email, password);
            navigate('/profile'); //Goes to profile page after login

        } catch (err) {
            setError(err.message); //error for failed login
        }
    }

    //Displays login form
    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg">
           
            <h2 className="text-3xl font-bold mb-4 text-center text-blue-700">Welcome Back!</h2>
            <p className="text-center text-gray-600 mb-6">Log in to view your profile</p>

            {error && (
                <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm text-center">{error}</div>

            )}

             {/*login form*/}   
            <form onSubmit={handleLogin} className ="space-y-5">
                <div>
                    {/*input for user's email*/}
                    <label className="block text-gray-700 mb-1">Email address</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded"/>
                </div>

                <div>
                    {/*user password input*/}
                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded"/>

                </div>

                <button
                    type="submit"
                    className="w-full bg-green-700 hover:bg-blue-800 text-white font-semibold py-2 rounded transition duration-200">Log In</button>
            </form>

               {/*link to create an account */} 
            <p className="text-center text-sm text-gray-500 mt-6">
                Don't have an account yet?{' '}
                <a href="signup" className="text-green-600 hover:underline">
                    Sign up here
                </a>
            </p>
            </div>
    );
}

export default Login;