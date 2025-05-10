import React, { useState } from 'react';
import events from "../utils/data";
import EventCard from '../components/EventCard';



//Component to display the events
function Home() {

    //hooks that manage the search and sort 
    const [searchTerm, setSearchTerm] = useState(''); //
    const [sortOption, setSortOption] = useState('');


    //filters the events based on what is typed and which sort method is chosen
    const filteredEvents = events
        .filter(event => 
            event.title.toLowerCase().includes(searchTerm.toLowerCase())
        )

        .sort((a,b) => {
            if (sortOption === 'priceLow')return a.price - b.price;
            if (sortOption === 'priceHigh') return b.price - a.price;
            if (sortOption === 'date') return new Date(a.date) - new Date(b.date);
            return 0;
        });

    return (
        //Container for events
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-5xl font-bold mb-6 text-center">Upcoming Events</h1>

            {/*Search and sort*/}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/*Search input*/}
                <input
                    type="text"
                    placeholder="Search for an event..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/2"/>

                
                {/*Sort dropdown menu*/}
                <select
                    value={sortOption}
                    onChange={e => setSortOption(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/4">

                    <option value="">Sort By</option>
                    <option value="priceLow">Price (Low to High)</option>
                    <option value="priceHigh">Price (High to Low)</option>
                    <option value="date">Date (First Date)</option>    
                 </select>

            </div>

            {/*Event cards*/}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
}

export default Home;

//done