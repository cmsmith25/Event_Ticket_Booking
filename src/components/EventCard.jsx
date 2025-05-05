import React from 'react';
import { Link } from 'react-router-dom';


//Displays single event in a card
function EventCard({ event }) {
    return (
        <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <img src={event.thumbnail} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p>{event.location}</p>
                <p>{event.date}</p>
                <p>${event.price}</p>
                {/*Link to view event's details*/}
                <Link
                    to={`/event/${event.id}`}
                    className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-blue-700">
                        View Details
                    </Link>
            </div>
        </div>
    );
}

export default EventCard;