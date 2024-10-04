import React, { useContext, useEffect,useState } from "react";
import { CartContext } from "../cart/CartContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css"

const Profile = ({handleProfile}) => {
    const [render,setRender]=useState(false)
    const { userData } = useContext(CartContext);
    const navigate = useNavigate();  
    useEffect(()=>{
        setRender(!render)
    },[])
    const handleLogout = () => {
        setRender(!render)
        localStorage.clear();
        navigate('/');  
    };
    console.log(userData,"hello");
if(userData){
    return (
        <div className="profile-main">
            <div>
                <p>{userData?.id}</p>
                <p>{userData?.name}</p>
                <p>{userData?.email}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )}
    else{
        return(<div className="profile-login"><button onClick={handleLogout}>logIn</button></div>)
    }
};

export default Profile;
