import React from 'react';
import {useCart,} from '../contexts/CartContext';
import {Link} from "react-router-dom";



function CartPage() {
    
    //gets cart info
    const { cartItems, totalPrice, updateQuantity, removeFromCart, clearCart} = useCart();
    
    //IF no items exist, shows message
    if (cartItems.length === 0) {
        //console.log("CArt items: ", cartItems);
        return( 
            <div className="text-center p-10">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link to="/" className="text-blue-600 hover:underline">Browse Events Here</Link>
            </div>
        );
    }


    //shows cart page with items
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

            {/*Will show list of items in the cart*/}
            {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-3 border-b py-4">
                    
                    {/*Shows the event photo */}
                    <img src={item.thumbnail}  alt={item.title} className="w-24 h-24  rounded"/>

                    {/*details of the event*/}
                    <div className="flex-1">
                        <h2>{item.title}</h2>
                        <p>{item.date} - {item.location}</p>
                        <p className="text-blue-800 font-bold">${item.price} per ticket</p>


                        {/*Input for the ticket quantity*/}
                        <div className="mt-2">
                            <label className="text-gray-700 text-sm">Quantity:</label>

                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                                className="w-18 p-1 border rounded"/>
                        </div>
                    </div>


                    {/*Button to remove things from cart*/ }
                    <button onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:underline">Remove</button>
                    </div>
            ))}

            {/*Summary of cart items*/}
            <div className="text-right mt-6">
                <p className="text-xl ">Total: ${totalPrice.toFixed(2)}</p>

                <div className="flex justify-end  gap-4 mt-4">
                <button onClick={clearCart} className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Clear Cart</button>
                <Link to ="/checkout" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Go to Checkout</Link>
            </div>
        </div>
        </div>
    );
    
}

export default CartPage;

//done