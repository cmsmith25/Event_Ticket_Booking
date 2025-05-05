import React, { useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import events from "../utils/data";


function EventDetails() {
    const {eventId} = useParams(); //Gets the event id
    const {addToCart} = useCart(); //Uses the cart context

    const [event, setEvent] = useState(null); //Stores event details
    const [quantity, setQuantity] = useState(1); //Store ticket quantity
    


    // event details
    useEffect(() => {
        console.log("eventId from URL:", eventId);
        const foundEvent = events.find(ev => ev.id === Number(eventId));
        console.log("found event:", foundEvent);
        setEvent(foundEvent);
        },[eventId]);
    
        //adds event to the  cart
        function handleAddToCart() {
        if (event) {
            addToCart(event, quantity);
            alert("Added to cart!");
        }
    }

    //chagnes number of tickets in cart
    function handleQuantityChange(e) {
        setQuantity(Number(e.target.value));
    }

    //message if event isn't found
    if (!event) {
        return <div className="text-center p-10">Event not found...</div>
    }


    //shows the event details
    return (
        <div className="max-w-4xl mx-auto p-6">
            <img
            src={event.thumbnail}
            alt={event.title}
            className="w-full h-64 object-cover rounded-lg mb-6"/>


            {/* title and event info*/}
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

            <p >{event.date} - {event.location}</p>
            <p>{event.description}</p>
            <p >${event.price} per ticket</p>


            {/*quantitiy input*/ }
            <div className="flex items-center gap-4 mb-6">
                <label className="text-gray-700">Quantity:</label>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="border border-gray-300 p-2 rounded w-20"/>
            </div>

            <button
                onClick={handleAddToCart}
                className="bg-green-700 hover:bg-blue-800 text-white px-6 py-2 rounded">Add to Cart</button>
        </div>
    );
}

export default EventDetails;