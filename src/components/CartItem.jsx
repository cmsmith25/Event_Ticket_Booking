import React from 'react';
import {useCart} from '../contexts/CartContext';


//Shows one item in shopping cart
function CartItem({ item }) {

    //Pull in the update and remove functions from CartContext
    const {updateQuantity, removeFromCart} = useCart();

    //This will run when the user changes the quantity
    const handleQuantityChange = (e) => {
        const newQty = parseInt(e.target.value); //converts the string into number
        if (newQty >=1) {
            updateQuantity(item.id, newQty); //Updates the quantity
        }
    };


    return (
        <div className="flex-gap-4 items-center border-b py-4">
            {/*Shows the product photo*/}
            <img
                src={item.thumbnail}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"/>

            {/*Event info section*/}
            <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">${item.price} each</p>

                {/*Quantity input*/}
                <div className="mt-2 flex items-center gap-2">
                    <label htmlFor={`qty-${item.id}`} className="text-sm text-gray-700">Qty:</label>
                    <input
                        id={`qty-${item.id}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={handleQuantityChange}
                        className="w-16 border border-gray-300 rounded px-2 py-1"/>

                </div>
            </div>

            {/*Total price and remove button*/}
            <div className="text-right">
                <p className="text-lg font-bold">
                    ${ (item.price * item.quantity).toFixed(2) }
                </p>
                <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline text-sm mt-1">Remove</button>
            </div>
        </div>
    );
}

export default CartItem;