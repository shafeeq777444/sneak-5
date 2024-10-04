import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { json } from "react-router-dom";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
    
    const [cartItems, setCartItems] = useState(
        []
    ); /* if state changes the rendering will be occur so usestate will be worked */
    const user = localStorage.getItem("user");
        const userData = user ? JSON.parse(user) : null;
    useEffect(() => {
        
        let userId=null
        if(userData){
            userId = userData.id;
        }
        
        const c = { ...userData, cart: [...cartItems] };

        const patchitem = async () => {
            try {
                const response = await axios.patch(`http://localhost:5001/users/${userId}`, { ...c });

                console.log(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                console.log("cartItems update to db completed");
            }
        };
        if (user) {
            patchitem();
        }
    }, [cartItems.length]);
    // addItems from modal
    const addToCart = (product) => {
        const existedItem = cartItems.find((item) => item.productCode == product.productCode);
        // already exist item added into cart
        if (existedItem) {
            setCartItems(
                cartItems.map((item) =>
                    item.productCode == product.productCode ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        }
        // new item added into cart
        else {
            if(userData){
            setCartItems([...cartItems, { ...product, quantity: 1 }]);}
            else{
                alert("please sign up")
            }
        }
    };
    // update quantity min:1 quantity occured

        
    
    const updateCartItemQuantity = (product, value) => {
        setCartItems(
            cartItems.map((item) =>
                item.productCode == product.productCode ? { ...item, quantity: Math.max(item.quantity + value, 1) } : item
            )
        );
    };
    const removeCartItem = (product) => {
        setCartItems(cartItems.filter((item) => item.productCode != product.productCode));
    };

    return (
        <CartContext.Provider value={{addToCart, updateCartItemQuantity, removeCartItem, cartItems,userData }}>
            {children}
        </CartContext.Provider>
    );
};
