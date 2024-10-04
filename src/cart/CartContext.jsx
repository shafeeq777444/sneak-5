import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Initialize cartItems from localStorage if available
        const savedCartItems = localStorage.getItem("cartItems");
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });
    const [fetchCart, setFetchCart] = useState([]);
    const [quantity, setQuantity] = useState(0);

    const user = localStorage.getItem("user");
    const userData = user ? JSON.parse(user) : null;

    useEffect(() => {
        let userId = userData ? userData.id : null;

        // Update cart items on the server
        const patchCartItems = async () => {
            const updatedUser = { ...userData, cart: [...cartItems] };

            try {
                const response = await axios.patch(`http://localhost:5001/users/${userId}`, { ...updatedUser });
                const cart = response.data.cart;
                setFetchCart(cart);
                console.log(cart, "Updated cart items on the server");
            } catch (error) {
                console.log("Error updating cartItems in DB:", error);
            } finally {
                console.log("CartItems updated to DB");
            }
        };

        // Calculate total quantity of cart items
        const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        setQuantity(totalQuantity);

        // Only patch if user exists
        if (userId) {
            patchCartItems();
        }

        // Save cartItems to localStorage whenever it changes
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

    }, [cartItems]); // Depend on cartItems only for updates

    useEffect(() => {
        // Fetch existing cart items from the server
        const fetchCartItems = async () => {
            try {
                const response = await axios.get("http://localhost:5001/users");
                const localStorageUser = JSON.parse(localStorage.getItem("user")); // Properly parse it
                const userCart = response.data.find((x) => x.id === localStorageUser?.id);
                console.log(userCart, "Fetched cart items from server");

                if (userCart && userCart.cart) {
                    setFetchCart(userCart.cart);
                    setCartItems(userCart.cart);  // Initialize cartItems with fetched data
                }
            } catch (error) {
                console.log("Error fetching cartItems from DB:", error);
            } finally {
                console.log("CartItems fetch from DB completed");
            }
        };

        if (userData) {
            fetchCartItems();
        }
    }, []); // Empty dependency array so it runs only on component mount

    // Add items to cart
    const addToCart = (product) => {
        const existedItem = cartItems.find((item) => item.productCode === product.productCode);

        if (existedItem) {
            setCartItems(
                cartItems.map((item) =>
                    item.productCode === product.productCode
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            if (userData) {
                setCartItems([...cartItems, { ...product, quantity: 1 }]);
            } else {
                alert("Please sign up");
            }
        }
    };

    // Update cart item quantity
    const updateCartItemQuantity = (product, value) => {
        setCartItems(
            cartItems.map((item) =>
                item.productCode === product.productCode
                    ? { ...item, quantity: Math.max(item.quantity + value, 1) }
                    : item
            )
        );
    };

    // Remove item from cart
    const removeCartItem = (product) => {
        setCartItems(cartItems.filter((item) => item.productCode !== product.productCode));
    };

    // Clear all cart items
    const clearCartItems = () => {
        setCartItems([]);
    };

    console.log(fetchCart, "Fetching from DB");

    return (
        <CartContext.Provider value={{ quantity, addToCart, clearCartItems, updateCartItemQuantity, removeCartItem, cartItems, userData, fetchCart,setCartItems }}>
            {children}
        </CartContext.Provider>
    );
};
