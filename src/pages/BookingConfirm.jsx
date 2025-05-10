import React from 'react';
import { useLocation, Link } from 'react-router-dom';


//component to show the booking confirmation
const BookingConfirm = () => {
    //gets the booking data passed from nav
    const location = useLocation();
    const booking = location.state?.booking;//chaining method that I learned to avoid undefined error


    //shows if no booking data was passed
    if(!booking) {
        return (
            <div className="p-5 max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-red-500">No booking information found</h2>
            </div>
        )
    }


    //Shows the confirmation details to user
    return (
        <div className="p-6 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-blue-700">Your Booking is Confirmed!</h2>
            <p className="mt-4">Thank you for your purchase!</p>


                {/*summary of the booking*/}
                <div className="mt-6 text-left">
                    <h3 className="font-semibold mb-2">Your Booking Information:</h3>
                    <ul>
                        {booking.items.map((item, idx) => (
                            <li key={idx}>
                                {item.title} - ${item.price} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3 font-medium">Total: ${booking.total.toFixed(2)}</p>
            </div>
            
            {/*link to go back to profile page*/}
            <Link to="/profile" className="text-blue-400 mt-6 block">Go to my profile</Link>
            </div>
    );
}


export default BookingConfirm;

//done