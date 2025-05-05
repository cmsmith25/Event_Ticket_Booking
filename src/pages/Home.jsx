import React from 'react';
import { Link } from "react-router-dom";
import events from "../utils/data";



//Component to display events
function Home() {
    return (
        //Container for events
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-5xl font-bold mb-6 text-center">Upcoming Events</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event.id} className="border rounded-lg shadow hover:shadow-md transition">
                        <img
                            src={event.thumbnail}
                            alt={event.title}
                            className="w-full h-48 object-cover rounded-t-lg" />
                        
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                            <p className="text-gray-600 mb-1">{event.date} - {event.location}</p>
                            <p className="text-blue-700 font-bold mb-2">${event.price}</p>
                            <Link to={`/event/${event.id}`}
                                className="text-white bg-green-700 hover:bg-blue-800 px-4 py-2 rounded inline-block">
                                    View Details
                                </Link>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    );
}

export default Home;