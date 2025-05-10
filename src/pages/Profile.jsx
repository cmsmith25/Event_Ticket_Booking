import React, {useState, useEffect} from 'react';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../utils/firebase';
import { useAuth } from '../contexts/AuthContext';
import {Navigate} from 'react-router-dom';



function ProfilePage() {
    //Gets user and updates function from auth context
    const {user, updateUser} = useAuth();

    //Holds input values from form
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bookings, setBookings] = useState([]);


    //Loads current user's info
    useEffect(() => {
        if (user) {
            setName(user.displayName || '');
            setEmail(user.email || '');

            const getBookings = async() => {
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const data = userSnap.data();
                    setBookings(data.bookings || []);
                } else {
                    console.log('No user document found');
                }
            };

            getBookings();
        }
    }, [user]);



    //Function runs when form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault(); //prevents page refresh issue I was having

        try{
            await updateUser(name,email); //updates the user info
            alert('Profile has been updated!');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    //if user is not logged in, sends them back to login page
    if(!user) {
        return <Navigate to="login" />;
    }

    return (
        <div className="max-w-md mx-auto mt-12 bg-white shadow-md rounded p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Edit profile</h2>

            {/*Shows profile pic*/}
            <div className="flex justify-center mb-6">
                <img
                    src="/assets/images/tiger.png"
                    alt="Profile"
                    className="w-24 h-24 rounded-full"/>
            </div>



            {/*Form for profile*/}
            <form onSubmit={handleSubmit}>
                {/* Name input*/}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter your first and last name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"/>
                </div>

                {/*Email input*/}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"/>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-2 rounded hover:bg-blue-800">Save Changes</button>
            </form>

            {/*Booking history*/}
            <div className="mt-10">
                <h3 className="text-xl text-center font-bold mb-4">Booking History</h3>
                {bookings.length === 0? (
                    <p className="text-gray-500">No bookings have been made yet.</p>
                ) : (
                    <ul className="space-y-6">
                        {bookings.map((booking, index) => (
                            <li key={index} className="p-3 border rounded bg-gray-50">
                                <p>Event: {booking.eventName}</p>
                                <p>Date: {booking.date}</p>
                                <p>Quantity: {booking.quantity}</p>
                                <p>Total Paid: ${booking.totalPrice}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );

}

export default ProfilePage;

//done