import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../utils/firebase';




function Signup() {
    //State hooks store user input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState ('');
    const [error, setError] = useState('');
    //Navigate to other pages
    const navigate = useNavigate();



    //Will handle signup form submission
    const handleSignup = async (e) => {
        e.preventDefault(); //Prevents page reloading
        setError(''); //Reset error message

        try{ 
        //Firebase logic to create a user
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/profile'); //Will redirect to profile after signpu
        } catch (err) {
            setError(err.message);
    }
};

    
    return (
        //Container for the signup form
         <div className="max-w-md mx-auto mt-20 p-10 bg-white rounded-xl shadow-lg">
         <h2 className="text-3xl  text-center font-bold mb-4  text-blue-700">Join Here!</h2>
         <p className="text-center text-gray-600 mb-6">Create an account to find upcoming events!</p>


        {/*Error message for signup issues*/}
        {error && (
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm text-center">{error}</div>
        )}

        {/*Signup form */}
        <form onSubmit={handleSignup} className="">
            <div>
                {/*Email input*/}
                <label className="block text-gray-700 mb-1">Email address</label>
                <input
                    type="email"
                    placeholder='user@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required className="w-full px-4 py-2 border  border-gray-300 rounded"/>
                    </div>


                    <div>

                        {/*Password input*/ }
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Choose a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required className="w-full py-2 px-4 border border-gray-300 rounded"/>
                    </div>

                    <button
                        type="Submit"
                        className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded">Sign Up</button>

                </form>


                {/*Link to the login page is user already exists*/}
                <p className="text-center  text-sm text-gray-501 mt-6">Already have a login?<a href="/login" className="text-green-600 hover:underline">Log in</a>
            
                </p>
            </div>
    );
}

export default Signup;


//Done