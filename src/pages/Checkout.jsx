import React from "react";
import { useNavigate } from "react-router-dom";
import {useCart} from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc, arrayUnion, getDoc, setDoc} from 'firebase/firestore';
import { db} from '../utils/firebase';


//Checkout component
const Checkout = () => {
    //Will get cart details and functions
    const { cartItems, clearCart, totalPrice} = useCart();

    //Gets the current user
    const {user} = useAuth();
    //Helps redirect after user makes a booking
    const navigate = useNavigate();


    //This will save the booking to Firebase
    const saveBooking = async (booking) => {
        const userRef = doc(db, 'users', user.uid );
        const userSnap = await getDoc(userRef);

        
        //Creates the document in Firebase to save user bookings
        if(!userSnap.exists()) {
            await setDoc(userRef, {
                email: user.email,
                bookings: [booking],
            });
        } else {
            //Adds a booking if the document exists
            await updateDoc(userRef, {
                bookings: arrayUnion(booking),
            });
        }


    }


    //Processes the checkout
    const handleCheckout = async () => {
        if(!user) {
            //Gives the user a message if they are not logged in yet
            alert("Please log in to your profile to complete your booking.");
            navigate("/login");
            return;

        }
    try {
        // this will create a booking object 
        const booking = {
            id: Date.now(),
            items: cartItems,
            total: totalPrice,
            eventName: cartItems.map(item => item.title).join(', '),
            date: new Date().toLocaleDateString(),
            quantity: cartItems.reduce((sum, item) => sum +item.quantity, 0),
            totalPrice: totalPrice,

        };


        //Saves the user's booking
        await saveBooking(booking);
        clearCart(); //clears the cart after booking
        // goes to the confirmation page after checkout
        navigate('/confirmation', { state: {booking}});
    } catch (error) {
        console.error("Checkout failed:", error);
        alert("Something went wrong during checkout.");


    }
}

    //Shows everything on the checkout page for user
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>
                        {item.title} - ${item.price} x {item.quantity}
                    </li>
                ))}
            </ul>
            <p className="mt-4">Total: ${totalPrice.toFixed(2)}</p>
            <button
                onClick={handleCheckout}
                className="bg-blue-600 text-white px-4 py-2 rounded mt-4">Confirm Purchase</button>
        </div>
    );
    
}

export default Checkout;

//DONE
