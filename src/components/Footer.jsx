import React from 'react';


function Footer() {
    return (
        <footer className="bg-gray-700 p-4 text-center text-sm text-gray-200 mt-10">
            © {new Date().getFullYear()} EventsForYou. All rights reserved.
        </footer>
    );
}

export default Footer;

//DONE