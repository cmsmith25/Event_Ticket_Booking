import React from "react";
import { createContext, useContext, useState} from 'react';

//Will create a new context for cart
const CartContext = createContext();

//Accesses cart context
export function useCart() {
    return useContext(CartContext);
}

//Component to wrap the app and provide the cart state
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);//Items in the cart
    const [totalPrice, setTotalPrice] = useState(0);//Total price of items


    //Add an item to cart or update quantity
    function addToCart(product, quantity= 1) {
        const existingItem = cartItems.find(item => item.id === product.id);
        let newCart;

        if (existingItem) {
            //If product is in cart, update quantity
            newCart = cartItems.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            );
        } else {
            //If new product, add to cart
            newCart = [ ...cartItems, { ...product, quantity}];
        }


        //Changes items and total in cart
        setCartItems(newCart);
        calculateTotal(newCart);
    }

    //Remove item from cart by ID
    function removeFromCart(productId) {
        const newCart = cartItems.filter(item => item.id !== productId);
        setCartItems(newCart);
        calculateTotal(newCart);
    }

    //Updates the quantity of a cart item
    function updateQuantity(productId, quantity) {
        const newCart = cartItems.map(item =>
            item.id === productId ? {...item, quantity } : item
        );

        setCartItems(newCart);
        calculateTotal(newCart);
    }

    //Calculates the total price in cart, multiplies price * quantity
    function calculateTotal(cart) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalPrice(total);
    }

    //Removes everything from cart
    function clearCart() {
        setCartItems([]);
        setTotalPrice(0);
    }



    return (
        <CartContext.Provider
        value = {{
            cartItems,
            totalPrice,
            addToCart, 
            removeFromCart,
            updateQuantity,
            clearCart,
        }}
        > {children}</CartContext.Provider>
    );

}

//done