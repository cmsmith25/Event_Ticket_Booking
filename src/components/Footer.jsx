import React from 'react';


function Footer() {
    return (
        <footer className="bg-gray-100 p-4 text-center text-sm text-gray-500 mt-10">
            © {new Date().getFullYear()} EventBooking. All rights reserved.
        </footer>
    );
}

export default Footer;