import React from "react";
import Profile from "./profile.jsx";
import Signup from "./signup.jsx";

const NavBar = (props)=>{
    
    const user = props.user ? props.user : null;
    
    return(
        <>
        <nav className="Navbar" style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", backgroundColor: "#6D28D9"}}>
            <div className="title">
                <h1 className="title-text">Post Generator</h1>
            </div>
            <div className="user">
                {user ? <Profile user={user}/> : <Signup/>}
            </div>
        </nav> 
        </>
    );
}

export default NavBar;