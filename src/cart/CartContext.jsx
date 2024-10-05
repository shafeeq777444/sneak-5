import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [quantity, setQuantity] = useState(0);
    const user = localStorage.getItem("user");
    const userData = user ? JSON.parse(user) : null;
    const userId = userData ? userData.id : null;
    const [cartItems, setCartItems] = useState([]);


    // useEffect(() => {
    //     const fetching = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:5001/users/${userId}`);
    //             const dbuserData=response.data;
    //            console.log(dbuserData.cart);
 
    //             setDbUser(dbuserData.cart)
                
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     if (userId) {
    //         fetching();  // Fech data only if userId is available
    //     }
    // }, [userId]);

    useEffect(  ()=>{
        async function fetching(){
            const response = await axios.get(`http://localhost:5001/users/${userId}`);
            setCartItems(response.data.cart)
        }
        fetching()
    },[userId])


      useEffect(()=>{
        const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setQuantity(totalPrice)
    },[cartItems])
      
      


    //     setQuantity(totalQuantity);
    //     fetching();
    // }, [d]);


//add
    const addToCart = async (product) => {
        const updatedCartItems = [...cartItems]
        const existedItem = updatedCartItems.find((item) => item.productCode === product.productCode);
        if (existedItem) {
            existedItem.quantity +=1
        } else {
            if (userData) {
                updatedCartItems.push({...product, quantity: 1})
            } else {
                alert("Please sign up");
            }
        }
        setCartItems(updatedCartItems)
        await updateCartInDb(updatedCartItems);
    };







    // Update cart item quantity
    // const updateCartItemQuantity = async (product, value) => {
    //     setCartItems(
    //         cartItems.map((item) =>
    //             item.productCode === product.productCode ? { ...item, quantity: Math.max(item.quantity + value, 1) } : item
    //         )
    //     );
    //     await updateCartInDb(cartItems);
    // };



//update
    const updateCartItemQuantity = async (product, value) => {
       const updatedCartItems = cartItems.map((item) =>
        item.productCode == product.productCode ? { ...item, quantity: Math.max(item.quantity + value, 1) } : item)
       setCartItems(updatedCartItems)
        await updateCartInDb(updatedCartItems);
    };



    
    // Remove item from cart
    // const removeCartItem = async (product) => {
    //     setCartItems(cartItems.filter((item) => item.productCode !== product.productCode));
    //     await updateCart
    //     InDb(cartItems);
    // };


    //dlt
        const removeCartItem = async (product) => {
            const updatedCartItems =  cartItems.filter((item) => item.productCode !== product.productCode);
            setCartItems(updatedCartItems)
            await updateCartInDb(updatedCartItems)
    };





//update
    // const updateCartItemQuantity = async (product, value) => {
    //     setCartItems(prevCartItems => {
    //         const updatedCartItems = prevCartItems.map(item =>
    //             item.productCode === product.productCode
    //                 ? { ...item, quantity: Math.max(item.quantity + value, 1) }
    //                 : item
    //         );

    //         updateCartInDb(updatedCartItems);
    //         return updatedCartItems;
    //     });
    // };

    //remv
    // const removeCartItem = async (product) => {
    //     setCartItems(prevCartItems => {
    //         const updatedCartItems = prevCartItems.filter(item => item.productCode !== product.productCode);

    //         updateCartInDb(updatedCartItems);
    //         return updatedCartItems;
    //     });
    // };


const clearCartItems = () =>{
    setCartItems([]);
}



//updating in db
    const updateCartInDb = async (updateCart) => {
        if (user) {
            try {
                await axios.patch(`http://localhost:5001/users/${userId}`, { cart: updateCart });
            } catch (error) {
                console.log(error);
            }
        }
    };


    return (
        <CartContext.Provider
            value={{ quantity, addToCart, clearCartItems, updateCartItemQuantity, removeCartItem, cartItems, userData, userId}}
        >
            {children}
        </CartContext.Provider>
    );
}