import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const NavBar = ({children})=>{
    const user = useSelector((state)=> {return state.user.data})
    const Nav = useNavigate();
    function titleHandler(){
        if(user){
            Nav("/home")
        }
        else{
            Nav("/")
        }
    }

    return( 
        <>
        <nav className="Navbar">
            <div className="title">
                <h1 className="title-text" onClick={titleHandler}>Post Generator</h1>
            </div>
            {children}
        </nav> 
        </>
    );
}

export default NavBar;